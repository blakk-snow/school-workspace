import { CurriculumIndicator, RawIndicator } from '../types/curriculum';

export const CLASS_NAMES: Record<string, string> = {
  'KG1': 'Kindergarten 1',
  'KG2': 'Kindergarten 2',
  'B1': 'Basic 1 (Primary 1)',
  'B2': 'Basic 2 (Primary 2)',
  'B3': 'Basic 3 (Primary 3)',
  'B4': 'Basic 4 (Primary 4)',
  'B5': 'Basic 5 (Primary 5)',
  'B6': 'Basic 6 (Primary 6)',
  'B7': 'Basic 7 (JHS 1)',
  'B8': 'Basic 8 (JHS 2)',
  'B9': 'Basic 9 (JHS 3)',
};

// Raw starter provided by user for Science B1
export const RAW_STARTER_SCIENCE_B1: Record<string, RawIndicator> = {
  "B1.1.1.1.1": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Living and Non-Living Things",
    "cs_code": "B1.1.1.1",
    "cs_desc": "Show understanding of the physical features and life processes of living things and use this understanding to classify them",
    "ind_desc": "Observe and describe different kinds of things in the environment.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Plant specimens; pictures of trees/flowers; garden visit; hand lens; Ecosystem chart; community walk; pictures of different habitats",
    "keywords": "observe, describe, different, kinds, things, environment",
    "assessment": "Observation worksheet; teacher observation rubric"
  },
  "B1.1.1.2.1": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Living and Non-Living Things",
    "cs_code": "B1.1.1.2",
    "cs_desc": "Understand the differences between living things, non-living things and things which have never been alive",
    "ind_desc": "Identify and name animals and plants in their locality.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Animal pictures/flashcards; video clips of animals; specimens (preserved); Plant specimens; pictures of trees/flowers; garden visit; hand lens",
    "keywords": "identify, name, animals, plants, locality",
    "assessment": "Oral Q&A; class sorting activity"
  },
  "B1.1.1.2.2": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Living and Non-Living Things",
    "cs_code": "B1.1.1.2",
    "cs_desc": "Understand the differences between living things, non-living things and things which have never been alive",
    "ind_desc": "Know the basic needs of living things (food, water and air).",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Bowls of water; kettle/hot water (supervised); water-cycle chart; pictures of animals eating/drinking; potted plants",
    "keywords": "know, basic, needs, living, things, food, water, air",
    "assessment": "Class exercise; teacher observation; drawing task"
  },
  "B1.1.1.2.3": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Living and Non-Living Things",
    "cs_code": "B1.1.1.2",
    "cs_desc": "Understand the differences between living things, non-living things and things which have never been alive",
    "ind_desc": "Describe the differences between living and non-living things.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Pupil's textbook; teacher's notes; chalk/markerboard; selection of living (potted plant, worm) and non-living objects (stone, pencil)",
    "keywords": "describe, differences, living, non-living, things",
    "assessment": "Oral Q&A; short-answer test (5 marks); Venn diagram sorting"
  },
  "B1.1.2.1.1": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "2. Materials",
    "cs_code": "B1.1.2.1",
    "cs_desc": "Recognise materials as important resources for providing human needs",
    "ind_desc": "Identify and name a variety of everyday materials in their immediate environment.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Samples of common materials (wood, metal, plastic, fabric); sorting trays; classroom objects made of different materials",
    "keywords": "identify, name, variety, everyday, materials, immediate, environment",
    "assessment": "Practical identification test; classroom materials hunt"
  },
  "B1.1.2.1.2": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "2. Materials",
    "cs_code": "B1.1.2.1",
    "cs_desc": "Recognise materials as important resources for providing human needs",
    "ind_desc": "Describe and group materials by their appearance (shape, size, colour, texture).",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Samples of common materials (wood, metal, plastic, fabric); sorting trays; hand lenses; textured fabric pieces",
    "keywords": "describe, group, materials, appearance, shape, size, colour, texture",
    "assessment": "Practical sorting task; class exercise; matching worksheet"
  },
  "B1.1.2.2.1": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "2. Materials",
    "cs_code": "B1.1.2.2",
    "cs_desc": "Understand the uses of different materials and relate their uses to their properties",
    "ind_desc": "Identify and classify materials as solid, liquid or gas.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Samples of solid, liquid and gaseous materials (wooden block, water, juice, balloon filled with air); sorting trays; plastic bottles",
    "keywords": "identify, classify, materials, solid, liquid, gas",
    "assessment": "Practical sorting task; class exercise (classification table); Q&A"
  },
  "B1.1.2.3.1": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "2. Materials",
    "cs_code": "B1.1.2.3",
    "cs_desc": "Demonstrate understanding of mixtures and how they can be separated",
    "ind_desc": "Demonstrate understanding that a mixture is two or more objects or materials put together.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Sand and stones mixture; water and sand mixture; sorting sieves; bowls; spoons; transparent cups",
    "keywords": "demonstrate, understanding, mixture, two, objects, materials, put, together",
    "assessment": "Class exercise; teacher observation; practical mixing and separating task"
  },
  "B1.2.1.1.1": {
    "strand": "2. CYCLES",
    "sub_strand": "1. Earth Science",
    "cs_code": "B1.2.1.1",
    "cs_desc": "Recognise that some events in our environment occur recurrently",
    "ind_desc": "Explain that some natural phenomena, such as day and night, occur repeatedly.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Pictures of sun, moon, sky; weather chart; flashlight (for sun-moon demo); globe or ball",
    "keywords": "explain, natural, phenomena, day, night, occur, repeatedly",
    "assessment": "Oral Q&A; short-answer test (5 marks); drawing of day and night scenes"
  },
  "B1.2.1.2.1": {
    "strand": "2. CYCLES",
    "sub_strand": "1. Earth Science",
    "cs_code": "B1.2.1.2",
    "cs_desc": "Recognise the relationship between the Earth and the Sun",
    "ind_desc": "Know that the sun is the main source of light to the Earth.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Pictures of sun, moon, sky; weather chart; flashlight (for sun-moon demo); shadow-stick experiment materials",
    "keywords": "know, sun, main, source, light, earth",
    "assessment": "Practical demonstration; class exercise; shadow tracing"
  },
  "B1.2.1.3.1": {
    "strand": "2. CYCLES",
    "sub_strand": "1. Earth Science",
    "cs_code": "B1.2.1.3",
    "cs_desc": "Show understanding of the effects of the wind, water, and sun on our environment",
    "ind_desc": "Observe the disappearance of mist and pools of water after rains.",
    "competencies": "Critical Thinking & Problem Solving; Personal Development & Leadership",
    "resources": "Bowls of water; kettle/hot water (supervised); water-cycle chart; pictures of puddles drying up; sponge and water",
    "keywords": "observe, disappearance, mist, pools, water, rains, sun, evaporation",
    "assessment": "Oral Q&A; class discussion; drawing the puddle drying up"
  },
  "B1.2.1.4.1": {
    "strand": "2. CYCLES",
    "sub_strand": "1. Earth Science",
    "cs_code": "B1.2.1.4",
    "cs_desc": "Demonstrate understanding of the importance of air and water in our environment",
    "ind_desc": "Identify sources and uses of water in the home and at school.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Bowls of water; kettle/hot water (supervised); water-cycle chart; pictures of water sources (tap, well, river, rain); water usage posters",
    "keywords": "identify, sources, uses, water, home, school",
    "assessment": "Class activity (drawing water uses); Q&A; matching worksheet"
  },
  "B1.2.1.4.2": {
    "strand": "2. CYCLES",
    "sub_strand": "1. Earth Science",
    "cs_code": "B1.2.1.4",
    "cs_desc": "Demonstrate understanding of the importance of air and water in our environment",
    "ind_desc": "Demonstrate the existence of air in the environment.",
    "competencies": "Critical Thinking & Problem Solving; Cultural Identity & Global Citizenship",
    "resources": "Balloons; plastic cups; water basins; paper windmills/fans; plastic bags; straws",
    "keywords": "demonstrate, existence, air, environment, wind, blow, space",
    "assessment": "Practical demonstration; teacher observation; balloon blowing challenge"
  },
  "B1.2.2.1.1": {
    "strand": "2. CYCLES",
    "sub_strand": "2. Life Cycles of Plants and Animals",
    "cs_code": "B1.2.2.1",
    "cs_desc": "Demonstrate understanding of the cycle of growth and development in plants and animals",
    "ind_desc": "Examine the structure of plants.",
    "competencies": "Critical Thinking & Problem Solving; Personal Development & Leadership",
    "resources": "Plant specimens with roots, stems, leaves, flowers; hand lenses; drawing paper; plant anatomy charts",
    "keywords": "examine, structure, plants, roots, stem, leaves, flower, seed",
    "assessment": "Observation worksheet; plant drawing and labelling; teacher observation"
  },
  "B1.2.2.1.2": {
    "strand": "2. CYCLES",
    "sub_strand": "2. Life Cycles of Plants and Animals",
    "cs_code": "B1.2.2.1",
    "cs_desc": "Demonstrate understanding of the cycle of growth and development in plants and animals",
    "ind_desc": "Observe different kinds of seeds.",
    "competencies": "Critical Thinking & Problem Solving; Personal Development & Leadership",
    "resources": "Various seeds (beans, maize, sunflower, orange, mango); sorting trays; hand lenses; planting pots; cotton wool; plastic cups",
    "keywords": "observe, different, kinds, seeds, size, shape, colour",
    "assessment": "Observation worksheet; practical seed sorting; germination diary project"
  },
  "B1.3.1.1.1": {
    "strand": "3. SYSTEMS",
    "sub_strand": "1. The Human Body Systems",
    "cs_code": "B1.3.1.1",
    "cs_desc": "Recognise that different parts of the human body work interdependently to perform a specific function",
    "ind_desc": "Identify the external human body parts by their appropriate names (e.g. eyes, ears, mouth, nose, legs, hands, shoulders, knees, fingers, toes and chest).",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Human body chart; mirrors; pictures of body parts; senses-station activity (objects to feel, hear, see, smell, taste); 'Head, Shoulders, Knees and Toes' song",
    "keywords": "identify, external, human, body, parts, appropriate, names, senses",
    "assessment": "Practical body parts labeling; class exercise (classification table); Simon Says game"
  },
  "B1.3.2.1.1": {
    "strand": "3. SYSTEMS",
    "sub_strand": "2. The Solar System",
    "cs_code": "B1.3.2.1",
    "cs_desc": "Understand the components of the solar system and their relationships",
    "ind_desc": "Know the places where living things live (land, air, and water).",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Ecosystem chart; community walk; pictures of different habitats (forest, desert, pond, ocean, air); toy animals",
    "keywords": "know, places, where, living, things, live, land, air, water, habitat",
    "assessment": "Habitat sorting task; matching animals to their homes; drawing a habitat"
  },
  "B1.4.1.1.1": {
    "strand": "4. FORCES AND ENERGY",
    "sub_strand": "1. Sources and Forms of Energy",
    "cs_code": "B1.4.1.1",
    "cs_desc": "Demonstrate understanding of the concept of energy, its various forms and sources",
    "ind_desc": "Understand energy and give examples of its uses.",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Torch; candle; battery; drum/bell; pictures of energy sources (sun, food, fuel); toy car",
    "keywords": "understand, energy, give, examples, uses, light, sound, heat, electricity",
    "assessment": "Practical demonstration; class exercise (identifying energy uses in the classroom)"
  },
  "B1.4.1.2.1": {
    "strand": "4. FORCES AND ENERGY",
    "sub_strand": "1. Sources and Forms of Energy",
    "cs_code": "B1.4.1.2",
    "cs_desc": "Show understanding of the concept of heat energy in terms of its importance, sources and effects",
    "ind_desc": "Explain the terms hot and cold.",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Warm water and cold water bowls (safely prepared); ice cubes; pictures of hot and cold things (fire, ice, sun, snow); thermometer",
    "keywords": "explain, terms, hot, cold, warmth, temperature, feel",
    "assessment": "Oral Q&A; hot/cold sorting card game; short-answer test"
  },
  "B1.4.2.1.1": {
    "strand": "4. FORCES AND ENERGY",
    "sub_strand": "2. Electricity and Electronics",
    "cs_code": "B1.4.2.1",
    "cs_desc": "Demonstrate understanding of the components of a simple electrical circuit and their functions",
    "ind_desc": "Know the importance of electricity and identify common household appliances that require electricity to work.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Dry cells/batteries; bulbs; wires; simple circuit kit; pictures/flashcards of household appliances (television, fridge, fan, iron)",
    "keywords": "know, importance, electricity, identify, common, household, appliances, power",
    "assessment": "Practical identification of appliances; sorting worksheet; oral Q&A on uses of electricity"
  },
  "B1.4.2.2.1": {
    "strand": "4. FORCES AND ENERGY",
    "sub_strand": "2. Electricity and Electronics",
    "cs_code": "B1.4.2.2",
    "cs_desc": "Demonstrate understanding of electronic devices and safety in using electrical appliances",
    "ind_desc": "Know examples of common electronic devices and their uses.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Mobile phone; tablet; calculator; television remote; dry cells; wires; simple LED bulb",
    "keywords": "know, examples, common, electronic, devices, uses, technology, entertainment",
    "assessment": "Practical demonstration (using a simple device); class discussion; device-use log"
  },
  "B1.4.3.1.1": {
    "strand": "4. FORCES AND ENERGY",
    "sub_strand": "3. Forces and Motion",
    "cs_code": "B1.4.3.1",
    "cs_desc": "Demonstrate understanding of forces and their effects on objects",
    "ind_desc": "Understand that movement is caused by applied forces (push or pull).",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Toy cars; ramps; balls; blocks; rubber bands; balloons; chairs to push/pull",
    "keywords": "movement, caused, applied, forces, push, pull, roll, slide",
    "assessment": "Practical movement experiment; Q&A; drawing push and pull actions"
  },
  "B1.4.3.2.1": {
    "strand": "4. FORCES AND ENERGY",
    "sub_strand": "3. Forces and Motion",
    "cs_code": "B1.4.3.2",
    "cs_desc": "Understand how simple machines make work easier",
    "ind_desc": "Understand what simple machines are and cite common examples.",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Toy cars; ramps (inclined plane); scissors (lever); toy wheelbarrow (wheel and axle); flag pole (pulley); bottle opener",
    "keywords": "understand, simple, machines, ease, work, examples, wedge, lever, pulley, ramp",
    "assessment": "Practical machine investigation; identification table; classroom simple machines tour"
  },
  "B1.5.1.1.1": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "1. Personal Hygiene and Sanitation",
    "cs_code": "B1.5.1.1",
    "cs_desc": "Recognise the importance of personal hygiene",
    "ind_desc": "Explain the need for bathing and know how it is done.",
    "competencies": "Personal Development & Leadership; Cultural Identity & Global Citizenship",
    "resources": "Soap; sponge; towel; bucket; basin; tippy-tap; water; hygiene poster showing bathing steps; doll/toy for bathing roleplay",
    "keywords": "explain, need, bathing, cleanliness, health, germs, how, done, soap",
    "assessment": "Oral Q&A; bathing roleplay/demonstration; short-answer test"
  },
  "B1.5.1.1.2": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "1. Personal Hygiene and Sanitation",
    "cs_code": "B1.5.1.1",
    "cs_desc": "Recognise the importance of personal hygiene",
    "ind_desc": "Know the need for and how to clean the teeth.",
    "competencies": "Personal Development & Leadership; Communication & Collaboration",
    "resources": "Toothbrush; toothpaste; clean water in a cup; teeth model (or clean comb for demo); hygiene poster showing brushing steps; mirrors",
    "keywords": "know, need, brushing, teeth, cavity, fresh, breath, toothbrush, toothpaste",
    "assessment": "Practical teeth-cleaning demonstration; peer-check observation sheet"
  },
  "B1.5.1.1.3": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "1. Personal Hygiene and Sanitation",
    "cs_code": "B1.5.1.1",
    "cs_desc": "Recognise the importance of personal hygiene",
    "ind_desc": "Demonstrate understanding of the need for and how to wash the hands.",
    "competencies": "Personal Development & Leadership; Cultural Identity & Global Citizenship",
    "resources": "Soap; clean running water; tippy-tap or tap; clean towel or air dry; handwashing poster (NaCCA/WHO standard steps); glitter (germ simulation)",
    "keywords": "demonstrate, understanding, need, handwashing, germs, health, soap, running, water",
    "assessment": "Practical demonstration of 6-step handwashing; hygiene-poster project; SBA"
  },
  "B1.5.1.2.1": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "1. Personal Hygiene and Sanitation",
    "cs_code": "B1.5.1.2",
    "cs_desc": "Recognise that air and water are essential to human health and understand how to keep them clean",
    "ind_desc": "Know that clean air and water are essential to human health.",
    "competencies": "Critical Thinking & Problem Solving; Cultural Identity & Global Citizenship",
    "resources": "Clean water and dirty water in jars; pictures of clean environments and polluted environments (smoke, trash); air pollution posters; water filter model",
    "keywords": "know, clean, air, water, essential, health, oxygen, drinking, breathing, hygiene",
    "assessment": "Class discussion; drawing clean and dirty water; clean environment sorting game"
  },
  "B1.5.2.1.1": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "2. Land and Water Resources",
    "cs_code": "B1.5.2.1",
    "cs_desc": "Understand the importance of land and water resources and know how to care for them",
    "ind_desc": "Identify some common diseases that affect the skin and their causes.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Posters on skin diseases (scabies, ringworm, rashes); pictures of skin care; soap; clean towel; school health/SHEP coordinator visit; mirrors",
    "keywords": "identify, common, skin, diseases, scabies, ringworm, causes, germs, dirt, prevention",
    "assessment": "Oral Q&A; matching disease to prevention; skin hygiene checklist"
  },
  "B1.5.3.1.1": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "3. Waste Management",
    "cs_code": "B1.5.3.1",
    "cs_desc": "Understand waste management and practice waste separation",
    "ind_desc": "Identify and describe different types of waste in the school and home environment.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Trash bin; rubbish bins (labelled: organic, plastic, paper); schoolyard walk; garbage samples (safe/clean paper, plastic bottles, orange peels, cans)",
    "keywords": "identify, describe, types, waste, rubbish, organic, inorganic, plastic, school, home",
    "assessment": "Waste sorting task; class discussion on organic and inorganic waste; trash walk worksheet"
  },
  "B1.5.3.2.1": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "3. Waste Management",
    "cs_code": "B1.5.3.2",
    "cs_desc": "Demonstrate knowledge of various waste disposal methods and practice them",
    "ind_desc": "Identify foods that can be processed and preserved at home.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Samples of foods (fish, maize, fruits, tomatoes); salt; sugar; plastic containers; pictures of food preservation (smoking, drying, salting, canning, cooling)",
    "keywords": "identify, foods, processed, preserved, home, drying, salting, smoking, cooling",
    "assessment": "Practical food preservation sorting task; matching game; class exercise"
  },
  "B1.5.4.1.1": {
    "strand": "5. HUMANS AND THE ENVIRONMENT",
    "sub_strand": "4. Technology and Society",
    "cs_code": "B1.5.4.1",
    "cs_desc": "Recognise the role of technology in solving human problems and describe the impact of technology on society",
    "ind_desc": "Describe the conditions of the weather.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Weather chart; thermometer; drawings of sunny, rainy, windy, cloudy, cold and hot days; weather-station activity (outdoor observation)",
    "keywords": "describe, conditions, weather, sunny, rainy, windy, cloudy, cold, hot, rain gauge",
    "assessment": "Oral weather check-in; weather chart drawing; daily weather monitoring sheet"
  }
};

// Additional multi-subject authentic NaCCA curricula: Mathematics, English, Computing, OWOP, Science B2/B7
export const ADDITIONAL_CURRICULA: Record<string, RawIndicator> = {
  // --- MATHEMATICS (B1) ---
  "B1.1.1.1.1_M": {
    "strand": "1. NUMBER",
    "sub_strand": "1. Whole Numbers: Counting and Representation",
    "cs_code": "B1.1.1.1",
    "cs_desc": "Demonstrate an understanding of quantities up to 100 concrete objects and counting forward and backward up to 100",
    "ind_desc": "Count reliably forward and backward in 1s, 2s, and 5s up to 100 using counters and number tracks.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Bottle tops, pebbles, number lines, 100-number chart, numeral flash cards",
    "keywords": "count, forward, backward, number track, quantity, counters",
    "assessment": "Oral counting test, practical grouping task, counting worksheet",
    "subject": "Mathematics",
    "class_id": "B1"
  },
  "B1.1.1.1.2_M": {
    "strand": "1. NUMBER",
    "sub_strand": "1. Whole Numbers: Counting and Representation",
    "cs_code": "B1.1.1.1",
    "cs_desc": "Demonstrate an understanding of quantities up to 100 concrete objects and counting forward and backward up to 100",
    "ind_desc": "Read, write, and model numbers from 1 to 100 using base-ten materials (bundles of 10s and loose 1s).",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Straw bundles (tens and ones), place value mats, base ten blocks, flashcards",
    "keywords": "tens, ones, place value, bundles, represent, numerals",
    "assessment": "Place-value representation test, matching numeral to bundles",
    "subject": "Mathematics",
    "class_id": "B1"
  },
  "B1.1.2.1.1_M": {
    "strand": "1. NUMBER",
    "sub_strand": "2. Number Operations (Addition & Subtraction)",
    "cs_code": "B1.1.2.1",
    "cs_desc": "Develop and apply mental mathematics strategies for basic addition and subtraction facts up to 20",
    "ind_desc": "Solve addition and subtraction word problems involving numbers within 20 using concrete items and acting out.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Story cards, counters, bead strings, ten-frames, addition mats",
    "keywords": "addition, subtraction, altogether, take away, difference, sum",
    "assessment": "Word problem worksheet, peer problem-solving presentation",
    "subject": "Mathematics",
    "class_id": "B1"
  },
  "B1.2.1.1.1_M": {
    "strand": "2. ALGEBRA",
    "sub_strand": "1. Patterns and Relationships",
    "cs_code": "B1.2.1.1",
    "cs_desc": "Identify, describe, extend and create repeating patterns using shapes, sounds and physical actions",
    "ind_desc": "Identify and reproduce repeating AB, AAB, and ABC patterns using colored beads and body movements.",
    "competencies": "Creativity & Innovation; Critical Thinking & Problem Solving",
    "resources": "Color beads, pattern cards, clapping rhythm guides, geometric cutouts",
    "keywords": "pattern, repeat, sequence, order, rule, extend",
    "assessment": "Pattern-making performance task, pattern continuation exercise",
    "subject": "Mathematics",
    "class_id": "B1"
  },
  "B1.3.1.1.1_M": {
    "strand": "3. GEOMETRY AND MEASUREMENT",
    "sub_strand": "1. 2D and 3D Shapes",
    "cs_code": "B1.3.1.1",
    "cs_desc": "Identify, sort and describe 2D shapes (circles, triangles, squares, rectangles) and 3D objects in the environment",
    "ind_desc": "Sort real-world objects into spheres, cubes, cylinders and match faces with 2D shapes.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Cardboard boxes, balls, tins, wooden geometric solids, shape sorting trays",
    "keywords": "circle, square, triangle, rectangle, cube, sphere, cylinder, flat, curved",
    "assessment": "Shape scavenger hunt observation, tactile sorting assessment",
    "subject": "Mathematics",
    "class_id": "B1"
  },
  "B1.4.1.1.1_M": {
    "strand": "4. DATA",
    "sub_strand": "1. Data Collection and Organization",
    "cs_code": "B1.4.1.1",
    "cs_desc": "Collect, organize and display simple concrete data using object graphs and pictographs",
    "ind_desc": "Collect data on favorite fruits or classroom shoes and arrange into a concrete object pictograph.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Real fruits or cutouts, grid mat, name tags, sticker charts",
    "keywords": "data, collect, sort, graph, pictograph, most, least",
    "assessment": "Pictograph reading test, class presentation of collected survey",
    "subject": "Mathematics",
    "class_id": "B1"
  },

  // --- MATHEMATICS (B2) ---
  "B2.1.1.1.1_M": {
    "strand": "1. NUMBER",
    "sub_strand": "1. Whole Numbers up to 1000",
    "cs_code": "B2.1.1.1",
    "cs_desc": "Demonstrate an understanding of whole numbers up to 1000 by counting, comparing and ordering",
    "ind_desc": "Skip count forward and backward by 10s and 100s up to 1000 starting at any number.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Number line 0-1000, Dienes blocks (hundreds flats), bead chains",
    "keywords": "hundreds, tens, skip count, compare, greater than, less than",
    "assessment": "Written number sequence quiz, oral skip-counting challenge",
    "subject": "Mathematics",
    "class_id": "B2"
  },
  "B2.1.2.1.1_M": {
    "strand": "1. NUMBER",
    "sub_strand": "3. Fractions (Fractions of a Whole)",
    "cs_code": "B2.1.2.1",
    "cs_desc": "Understand fractions as equal parts of a whole (halves, thirds, quarters)",
    "ind_desc": "Fold paper strips and divide circular food models into equal halves and quarters to name unit fractions.",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Paper circles, fraction strips, clay models, oranges or biscuits for sharing",
    "keywords": "half, quarter, equal parts, fraction, denominator, numerator",
    "assessment": "Fraction shading worksheet, practical paper folding test",
    "subject": "Mathematics",
    "class_id": "B2"
  },

  // --- ENGLISH LANGUAGE (B1) ---
  "B1.1.1.1.1_E": {
    "strand": "1. ORAL LANGUAGE",
    "sub_strand": "1. Songs, Rhymes and Poems",
    "cs_code": "B1.1.1.1",
    "cs_desc": "Demonstrate understanding of simple songs, rhymes, and poems with rhythm and expression",
    "ind_desc": "Recite traditional Ghanaian rhymes and poems with appropriate gestures and rhythm.",
    "competencies": "Cultural Identity & Global Citizenship; Communication & Collaboration",
    "resources": "Audio recordings, rhyme charts, clapping sticks, illustrated poem posters",
    "keywords": "rhyme, rhythm, gestures, poem, recite, expression, melody",
    "assessment": "Performance rubric for recitation, peer appreciation circle",
    "subject": "English Language",
    "class_id": "B1"
  },
  "B1.2.1.1.1_E": {
    "strand": "2. READING",
    "sub_strand": "1. Phonemic and Phonological Awareness",
    "cs_code": "B1.2.1.1",
    "cs_desc": "Recognise, isolate and blend letter sounds to read simple decodable words (CVC)",
    "ind_desc": "Segment and blend consonant-vowel-consonant (CVC) sounds to read words (e.g., cat, sun, pen, pot).",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Phonic flashcards, letter sound mat, decodable reader books, magnetic letters",
    "keywords": "phonics, blend, segment, sound, letter, consonant, vowel",
    "assessment": "Phonic blending oral test, word-building card game",
    "subject": "English Language",
    "class_id": "B1"
  },
  "B1.3.1.1.1_E": {
    "strand": "3. WRITING",
    "sub_strand": "1. Penmanship and Letter Formation",
    "cs_code": "B1.3.1.1",
    "cs_desc": "Demonstrate control in handwriting and form legible lowercase and uppercase letters",
    "ind_desc": "Write all lowercase and uppercase letters of the English alphabet with correct starting points and strokes.",
    "competencies": "Personal Development & Leadership; Creativity & Innovation",
    "resources": "Sand trays, writing guidelines paper, tracing stencils, whiteboard markers",
    "keywords": "letter, uppercase, lowercase, stroke, pencil grip, spacing",
    "assessment": "Handwriting workbook inspection, letter formation checklist",
    "subject": "English Language",
    "class_id": "B1"
  },
  "B1.4.1.1.1_E": {
    "strand": "4. USING WRITING CONVENTIONS",
    "sub_strand": "1. Capital Letters and Full Stops",
    "cs_code": "B1.4.1.1",
    "cs_desc": "Demonstrate knowledge of punctuation and capitalization in simple sentences",
    "ind_desc": "Apply capital letters at the beginning of names of persons and the start of a sentence, ending with a period.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Sentence strips, punctuation cards (period, capital letter badges), big book",
    "keywords": "capital letter, full stop, sentence, name, punctuation, grammar",
    "assessment": "Editing worksheet, dictation test with punctuation check",
    "subject": "English Language",
    "class_id": "B1"
  },

  // --- COMPUTING (B1 & B4 & B7) ---
  "B1.1.1.1.1_C": {
    "strand": "1. INTRODUCTION TO COMPUTING",
    "sub_strand": "1. Components of a Computer",
    "cs_code": "B1.1.1.1",
    "cs_desc": "Identify and name physical parts of a computer system and understand their safe usage",
    "ind_desc": "Identify and point out the monitor, mouse, keyboard, and system unit in the classroom or computer lab.",
    "competencies": "Digital Literacy; Critical Thinking & Problem Solving",
    "resources": "Real desktop computer / laptop, flashcards of computer parts, cutouts, lab poster",
    "keywords": "monitor, mouse, keyboard, system unit, screen, click, power",
    "assessment": "Practical identification test, matching computer parts to names worksheet",
    "subject": "Computing",
    "class_id": "B1"
  },
  "B1.1.1.2.1_C": {
    "strand": "1. INTRODUCTION TO COMPUTING",
    "sub_strand": "2. Health and Safety in Using ICT Devices",
    "cs_code": "B1.1.1.2",
    "cs_desc": "Demonstrate safe handling, posture, and care when interacting with computing devices",
    "ind_desc": "Demonstrate correct sitting posture and clean hands protocol when sitting in front of a computer screen.",
    "competencies": "Personal Development & Leadership; Digital Literacy",
    "resources": "Computer lab ergonomics chart, adjustable chairs, hand sanitizer, screen filter illustration",
    "keywords": "posture, ergonomics, eye level, safety, clean hands, cable safety",
    "assessment": "Ergonomics observation rubric, safety simulation in lab",
    "subject": "Computing",
    "class_id": "B1"
  },
  "B4.2.1.1.1_C": {
    "strand": "2. PRODUCTIVITY TOOLS",
    "sub_strand": "1. Word Processing",
    "cs_code": "B4.2.1.1",
    "cs_desc": "Demonstrate the ability to create, edit, format and save simple text documents using a word processor",
    "ind_desc": "Type a paragraph about 'My Best Friend', apply font formatting (bold, italic, color) and save to a folder.",
    "competencies": "Digital Literacy; Creativity & Innovation",
    "resources": "Computers with LibreOffice Writer / MS Word, sample text handout, projector",
    "keywords": "word processor, type, font, formatting, bold, italics, save, document",
    "assessment": "Practical typing and formatting assignment, file submission rubric",
    "subject": "Computing",
    "class_id": "B4"
  },
  "B7.4.1.1.1_C": {
    "strand": "4. COMPUTATIONAL THINKING",
    "sub_strand": "1. Algorithms and Block-based Programming",
    "cs_code": "B7.4.1.1",
    "cs_desc": "Demonstrate understanding of algorithms and use visual programming tools to solve problems",
    "ind_desc": "Design a step-by-step algorithm and implement an interactive animated story using Scratch block code.",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation; Digital Literacy",
    "resources": "Scratch offline editor, algorithmic flowchart templates, sample sprite assets",
    "keywords": "algorithm, sequence, loops, conditionals, scratch, sprite, script",
    "assessment": "Scratch project portfolio, algorithm flowchart design presentation",
    "subject": "Computing",
    "class_id": "B7"
  },

  // --- OUR WORLD AND OUR PEOPLE (OWOP) (B1) ---
  "B1.1.1.1.1_O": {
    "strand": "1. ALL ABOUT US",
    "sub_strand": "1. Myself and My Unique Identity",
    "cs_code": "B1.1.1.1",
    "cs_desc": "Recognise the self as a unique individual created with strengths and dignity",
    "ind_desc": "State one's full name, age, gender, home town, and special talents to peers with confidence.",
    "competencies": "Personal Development & Leadership; Cultural Identity & Global Citizenship",
    "resources": "Mirrors, 'All About Me' craft templates, drawing pencils, identity badges",
    "keywords": "identity, unique, talents, name, gender, home town, confidence",
    "assessment": "Self-introduction presentation rubric, 'All About Me' booklet",
    "subject": "Our World and Our People",
    "class_id": "B1"
  },
  "B1.4.1.1.1_O": {
    "strand": "4. OUR NATION GHANA",
    "sub_strand": "1. National Symbols and Heritage",
    "cs_code": "B1.4.1.1",
    "cs_desc": "Demonstrate pride and respect for Ghanaian national symbols and patriotic songs",
    "ind_desc": "Identify and color the Ghana National Flag and explain the meaning of the Red, Gold, Green and Black Star.",
    "competencies": "Cultural Identity & Global Citizenship; Communication & Collaboration",
    "resources": "Ghana National Flag, crayons, national anthem lyrics sheet, coat of arms poster",
    "keywords": "national flag, red, gold, green, black star, freedom, justice, ghana",
    "assessment": "Flag coloring and oral explanation assessment, singing the national anthem",
    "subject": "Our World and Our People",
    "class_id": "B1"
  },

  // --- SCIENCE (B2 & B7) ---
  "B2.1.1.1.1_S": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Living and Non-Living Things",
    "cs_code": "B2.1.1.1",
    "cs_desc": "Show understanding of the life processes of living things (feeding, movement, breathing, reproduction)",
    "ind_desc": "Observe and record how different animals move (walk, fly, hop, swim, slither) in search of food or shelter.",
    "competencies": "Critical Thinking & Problem Solving; Communication & Collaboration",
    "resources": "Animal locomotion video clips, animal movement imitation games, school field study",
    "keywords": "movement, locomotion, swim, fly, slither, crawl, survival, food",
    "assessment": "Locomotion classification table, student movement roleplay rubric",
    "subject": "Science",
    "class_id": "B2"
  },
  "B7.1.1.1.1_S": {
    "strand": "1. DIVERSITY OF MATTER",
    "sub_strand": "1. Classifying Matter and Particulate Nature",
    "cs_code": "B7.1.1.1",
    "cs_desc": "Demonstrate understanding of the particulate nature of matter and physical/chemical changes",
    "ind_desc": "Investigate evidence supporting the particulate nature of matter using diffusion experiments with potassium permanganate or perfume in air.",
    "competencies": "Critical Thinking & Problem Solving; Creativity & Innovation",
    "resources": "Beakers, water, potassium permanganate crystals / food coloring, scent bottle, stop clock",
    "keywords": "matter, particles, atoms, diffusion, kinetic theory, concentration gradient",
    "assessment": "Laboratory report, inquiry question answers, observation diagram",
    "subject": "Science",
    "class_id": "B7"
  }
};

/**
 * Normalizes raw indicator records into structured CurriculumIndicator objects
 */
export function normalizeIndicator(
  code: string,
  raw: RawIndicator,
  defaultSubject: string = 'Science',
  defaultClass: string = 'B1'
): CurriculumIndicator {
  // Infer classId from code (e.g. "B1.1.1.1.1" -> "B1", "KG1.1.1.1.1" -> "KG1")
  let classId = raw.class_id;
  if (!classId) {
    const match = code.match(/^([A-Z]+[0-9]+|[A-Z]+)/i);
    classId = match ? match[1].toUpperCase() : defaultClass;
  }

  const subject = raw.subject || defaultSubject;
  const className = CLASS_NAMES[classId] || `Class ${classId}`;

  // Parse competencies into array
  const competenciesRaw = raw.competencies || '';
  const competencies = competenciesRaw
    ? competenciesRaw.split(/;\s*|,\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  // Parse resources into array
  const resourcesRaw = raw.resources || '';
  const resources = resourcesRaw
    ? resourcesRaw.split(/;\s*|,\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  // Parse keywords into array
  const keywordsRaw = raw.keywords || '';
  const keywords = keywordsRaw
    ? keywordsRaw.split(/,\s*|;\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  // Parse assessment methods into array
  const assessmentRaw = raw.assessment || '';
  const assessment = assessmentRaw
    ? assessmentRaw.split(/;\s*|,\s*/).map(s => s.trim()).filter(Boolean)
    : [];

  return {
    id: code,
    code,
    classId,
    className,
    subject,
    strand: raw.strand || 'General Strand',
    subStrand: raw.sub_strand || 'General Sub-strand',
    csCode: raw.cs_code || code.split('.').slice(0, 4).join('.'),
    csDesc: raw.cs_desc || '',
    indDesc: raw.ind_desc || '',
    competencies,
    competenciesRaw,
    resources,
    resourcesRaw,
    keywords,
    keywordsRaw,
    assessment,
    assessmentRaw,
  };
}

/**
 * Loads default starter database
 */
export function getInitialCurriculum(): CurriculumIndicator[] {
  const list: CurriculumIndicator[] = [];

  // 1. Process user's exact science starter
  for (const [code, raw] of Object.entries(RAW_STARTER_SCIENCE_B1)) {
    list.push(normalizeIndicator(code, raw, 'Science', 'B1'));
  }

  // 2. Process additional authentic subjects and classes
  for (const [code, raw] of Object.entries(ADDITIONAL_CURRICULA)) {
    list.push(normalizeIndicator(code, raw, raw.subject || 'General', raw.class_id || 'B1'));
  }

  return list;
}
