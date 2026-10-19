import jsPDF from 'jspdf';
import { LessonBinderItem } from '../types/curriculum';

export interface PdfExportOptions {
  title?: string;
  schoolName?: string;
  teacherName?: string;
  academicYear?: string;
  termFilter?: string; // 'All' | 'Term 1' | 'Term 2' | 'Term 3'
  format?: 'scheme' | 'lesson_notes' | 'both';
}

/**
 * Generates and downloads a formatted PDF for the Lesson Binder items
 */
export function exportLessonBinderToPdf(
  items: LessonBinderItem[],
  options: PdfExportOptions = {}
): void {
  if (items.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const title = options.title || 'NaCCA Standard-Based Scheme of Work & Lesson Binder';
  const schoolName = options.schoolName || '';
  const teacherName = options.teacherName || '';
  const academicYear = options.academicYear || '2026/2027';
  const format = options.format || 'both';

  // Sort items chronologically by Term and Week
  const sortedItems = [...items].sort((a, b) => {
    const termA = a.term || 'Term 1';
    const termB = b.term || 'Term 1';
    if (termA !== termB) return termA.localeCompare(termB);
    const weekA = a.week || 1;
    const weekB = b.week || 1;
    return weekA - weekB;
  });

  const filteredItems = options.termFilter && options.termFilter !== 'All'
    ? sortedItems.filter((i) => i.term === options.termFilter)
    : sortedItems;

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let currentY = margin;

  // Helper: check and add new page
  const ensureSpace = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - 16) {
      doc.addPage();
      currentY = margin;
      drawHeaderBanner(false);
    }
  };

  // Helper: Draw header banner
  const drawHeaderBanner = (isFirstPage: boolean) => {
    doc.setFillColor(6, 78, 59); // Emerald-900
    doc.rect(margin, currentY, contentWidth, isFirstPage ? 24 : 12, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    
    if (isFirstPage) {
      doc.setFontSize(10);
      doc.text('REPUBLIC OF GHANA · GHANA EDUCATION SERVICE (GES)', margin + 4, currentY + 6);
      doc.setFontSize(13);
      doc.text('NaCCA CURRICULUM SCHEME OF WORK & LESSON BINDER', margin + 4, currentY + 13);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(
        `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · Standard-Based Curriculum`,
        margin + 4,
        currentY + 19
      );
      currentY += 28;
    } else {
      doc.setFontSize(8);
      doc.text(`NaCCA SCHEME OF WORK · ${title.toUpperCase()}`, margin + 4, currentY + 7);
      currentY += 16;
    }
    doc.setTextColor(0, 0, 0);
  };

  // PAGE 1: Header & Metadata Box
  drawHeaderBanner(true);

  // Metadata Card
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.setFillColor(248, 250, 252); // slate-50
  doc.roundedRect(margin, currentY, contentWidth, 22, 2, 2, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42); // slate-900

  // Left column
  doc.text(`Title: ${title}`, margin + 4, currentY + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Academic Year: ${academicYear}  |  Term: ${options.termFilter || 'All Terms'}`, margin + 4, currentY + 12);
  doc.text(`Total Planned Lessons: ${filteredItems.length} Indicators`, margin + 4, currentY + 18);

  // Right column
  if (schoolName) {
    doc.text(`School: ${schoolName}`, margin + contentWidth / 2, currentY + 6);
  }
  if (teacherName) {
    doc.text(`Teacher: ${teacherName}`, margin + contentWidth / 2, currentY + 12);
  }
  doc.text(`Status: Verified NaCCA Standard`, margin + contentWidth / 2, currentY + 18);

  currentY += 28;

  // SECTION 1: SCHEME OF WORK (OVERVIEW TABLE)
  if (format === 'scheme' || format === 'both') {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 78, 59);
    doc.text('1. SCHEME OF WORK SUMMARY TABLE', margin, currentY);
    currentY += 5;

    // Table Header
    doc.setFillColor(226, 232, 240); // slate-200
    doc.rect(margin, currentY, contentWidth, 7, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);

    const colWeek = margin + 2;
    const colCode = margin + 20;
    const colSubject = margin + 45;
    const colStrand = margin + 80;
    const colOutcome = margin + 125;

    doc.text('Schedule', colWeek, currentY + 5);
    doc.text('Indicator', colCode, currentY + 5);
    doc.text('Class/Subj', colSubject, currentY + 5);
    doc.text('Strand > Sub-Strand', colStrand, currentY + 5);
    doc.text('Target Learning Outcome', colOutcome, currentY + 5);

    currentY += 8;

    filteredItems.forEach((item, index) => {
      ensureSpace(16);

      const isEven = index % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(margin, currentY, contentWidth, 14, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, currentY + 14, margin + contentWidth, currentY + 14);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(`${item.term || 'T1'}\nWk ${item.week || 1}`, colWeek, currentY + 4.5);

      doc.setTextColor(6, 78, 59);
      doc.text(item.indicator.code, colCode, currentY + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`CS: ${item.indicator.csCode}`, colCode, currentY + 9);

      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text(`${item.indicator.classId} · ${item.indicator.subject}`, colSubject, currentY + 4.5);

      const strandText = doc.splitTextToSize(
        `${item.indicator.strand.replace(/^\d+\.\s*/, '')} / ${item.indicator.subStrand.replace(/^\d+\.\s*/, '')}`,
        42
      );
      doc.setFontSize(6.5);
      doc.setTextColor(71, 85, 105);
      doc.text(strandText.slice(0, 2), colStrand, currentY + 4);

      const indDescLines = doc.splitTextToSize(item.indicator.indDesc, contentWidth - 128);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);
      doc.text(indDescLines.slice(0, 2), colOutcome, currentY + 4.5);

      currentY += 14;
    });

    currentY += 8;
  }

  // SECTION 2: DETAILED 3-PHASE LESSON NOTES
  if (format === 'lesson_notes' || format === 'both') {
    ensureSpace(24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 78, 59);
    doc.text('2. DETAILED 3-PHASE LESSON NOTES', margin, currentY);
    currentY += 6;

    filteredItems.forEach((item, index) => {
      // Each lesson note starts clean
      ensureSpace(65);

      const ind = item.indicator;

      // Card Container
      doc.setDrawColor(203, 213, 225);
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, currentY, contentWidth, 7, 'F');
      
      // Top header of lesson note
      doc.setFillColor(6, 78, 59);
      doc.rect(margin, currentY, contentWidth, 7, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(
        `LESSON NOTE #${index + 1} · ${item.term || 'Term 1'}, WEEK ${item.week || 1}  —  ${ind.code} (${ind.subject}, ${ind.className})`,
        margin + 3,
        currentY + 4.8
      );
      currentY += 9;

      // Metadata details
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, contentWidth, 14, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, currentY, contentWidth, 14, 'S');

      doc.setFontSize(7);
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'bold');
      doc.text('Strand:', margin + 3, currentY + 4);
      doc.setFont('helvetica', 'normal');
      doc.text(ind.strand, margin + 18, currentY + 4);

      doc.setFont('helvetica', 'bold');
      doc.text('Sub-Strand:', margin + 3, currentY + 8);
      doc.setFont('helvetica', 'normal');
      doc.text(ind.subStrand, margin + 22, currentY + 8);

      doc.setFont('helvetica', 'bold');
      doc.text('Content Standard:', margin + 3, currentY + 12);
      doc.setFont('helvetica', 'normal');
      const csText = doc.splitTextToSize(`${ind.csCode}: ${ind.csDesc}`, contentWidth - 35);
      doc.text(csText[0] || '', margin + 30, currentY + 12);

      currentY += 16;

      // Target Learning Indicator
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(6, 78, 59);
      doc.text('Learning Indicator / Performance Target:', margin, currentY);
      currentY += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(15, 23, 42);
      const indLines = doc.splitTextToSize(ind.indDesc, contentWidth);
      doc.text(indLines, margin, currentY);
      currentY += indLines.length * 3.8 + 2;

      // Core Competencies & Vocabulary
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105);
      doc.text('Core Competencies: ', margin, currentY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 41, 59);
      doc.text(ind.competencies.join(', ') || 'Critical Thinking; Communication', margin + 28, currentY);
      currentY += 4.5;

      if (ind.keywords.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text('Vocabulary / Terms: ', margin, currentY);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(30, 41, 59);
        doc.text(ind.keywords.join(', '), margin + 28, currentY);
        currentY += 4.5;
      }

      // Teaching & Learning Materials (TLMs)
      if (ind.resources.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text('TLMs / Resources: ', margin, currentY);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 41, 59);
        const resLines = doc.splitTextToSize(ind.resources.join('; '), contentWidth - 28);
        doc.text(resLines, margin + 28, currentY);
        currentY += resLines.length * 3.5 + 2;
      }

      // 3-Phase Pedagogy Box
      ensureSpace(28);
      doc.setFillColor(241, 245, 249); // slate-100
      doc.rect(margin, currentY, contentWidth, 24, 'F');
      doc.setDrawColor(203, 213, 225);
      doc.rect(margin, currentY, contentWidth, 24, 'S');

      // Phase 1
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(6, 78, 59);
      doc.text('Phase 1 (Starter - 10m):', margin + 3, currentY + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(
        `Warm-up song/riddle. Diagnostic questions on ${ind.keywords.slice(0, 2).join(', ') || ind.subStrand}. Share goal: "${ind.indDesc.slice(0, 50)}..."`,
        margin + 36,
        currentY + 4.5
      );

      // Phase 2
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 78, 59);
      doc.text('Phase 2 (Main - 40m):', margin + 3, currentY + 11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      const phase2Lines = doc.splitTextToSize(
        `Group observation of TLMs. Guide learners through hands-on activity for ${ind.indDesc}. Teacher scaffolds, checks vocabulary, and differentiates tasks.`,
        contentWidth - 40
      );
      doc.text(phase2Lines.slice(0, 2), margin + 36, currentY + 11);

      // Phase 3
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(6, 78, 59);
      doc.text('Phase 3 (Plenary - 10m):', margin + 3, currentY + 19);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(
        `Learners summarize key takeaways. Administer check: ${ind.assessment[0] || 'Oral Q&A reflection'}. Assign follow-up homework.`,
        margin + 36,
        currentY + 19
      );

      currentY += 28;

      // Divider between lesson plans
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, currentY, margin + contentWidth, currentY);
      currentY += 5;
    });
  }

  // Add Page Numbers to all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(
      `NaCCA Ghana Curriculum Navigator · Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 6,
      { align: 'center' }
    );
  }

  // Trigger download in browser
  const filename = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
