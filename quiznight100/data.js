export const QUIZ_VERSION = 1;

export const categories = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    shortTitle: "General",
    tone: "The broad opener: culture, geography, science, language, and sharp table instincts.",
    theme: "showtime",
    questions: [
      {
        text: "Which planet in our solar system has the most mass?",
        options: ["Earth", "Saturn", "Neptune", "Jupiter"],
        answerIndex: 3,
        explanation: "Jupiter is more massive than all the other planets combined."
      },
      {
        text: "In which country would you find the city of Marrakesh?",
        options: ["Morocco", "Tunisia", "Egypt", "Algeria"],
        answerIndex: 0,
        explanation: "Marrakesh is one of Morocco's major historic cities."
      },
      {
        text: "What is the chemical symbol for potassium?",
        options: ["P", "Pt", "K", "Po"],
        answerIndex: 2,
        explanation: "Potassium's symbol is K, from the Latin word kalium."
      },
      {
        text: "Which novel begins with the line, 'It was the best of times, it was the worst of times'?",
        options: ["Great Expectations", "Jane Eyre", "Middlemarch", "A Tale of Two Cities"],
        answerIndex: 3,
        explanation: "Charles Dickens opens A Tale of Two Cities with that famous contrast."
      },
      {
        text: "What is the only country crossed by both the equator and the Tropic of Capricorn?",
        options: ["Brazil", "Indonesia", "Kenya", "Australia"],
        answerIndex: 0,
        explanation: "Brazil is crossed by the equator in the north and the Tropic of Capricorn in the south."
      },
      {
        text: "Which composer wrote the opera The Magic Flute?",
        options: ["Giuseppe Verdi", "Richard Wagner", "Wolfgang Amadeus Mozart", "Giacomo Puccini"],
        answerIndex: 2,
        explanation: "The Magic Flute premiered in Vienna in 1791, the final year of Mozart's life."
      },
      {
        text: "What is the name of the scale used to measure the hardness of minerals?",
        options: ["Mohs scale", "Beaufort scale", "Richter scale", "Scoville scale"],
        answerIndex: 0,
        explanation: "The Mohs scale ranks minerals from talc at 1 to diamond at 10."
      },
      {
        text: "Which African country has Portuguese as its official language and Maputo as its capital?",
        options: ["Angola", "Cape Verde", "Guinea-Bissau", "Mozambique"],
        answerIndex: 3,
        explanation: "Maputo is Mozambique's capital, and Portuguese is its official language."
      },
      {
        text: "In typography, what is a pangram?",
        options: ["A font with no serifs", "A sentence using every letter of the alphabet", "A paragraph set in all capitals", "A decorative initial letter"],
        answerIndex: 1,
        explanation: "Pangrams are useful for previewing how every letter appears in a typeface."
      },
      {
        text: "Which SI unit is named after the scientist who formulated the law of electromagnetic induction?",
        options: ["Tesla", "Farad", "Henry", "Ohm"],
        answerIndex: 1,
        explanation: "The farad is named after Michael Faraday."
      }
    ]
  },
  {
    id: "history",
    title: "History",
    shortTitle: "History",
    tone: "A sweep across empires, revolutions, exploration, conflict, and turning points.",
    theme: "archive",
    questions: [
      {
        text: "The pyramids at Giza were built in which ancient civilisation?",
        options: ["Ancient Egypt", "Ancient Greece", "Ancient Rome", "Ancient Persia"],
        answerIndex: 0,
        explanation: "The Giza pyramid complex was built during Egypt's Old Kingdom."
      },
      {
        text: "In 1066, which battle changed the course of English history?",
        options: ["Battle of Agincourt", "Battle of Bosworth Field", "Battle of Bannockburn", "Battle of Hastings"],
        answerIndex: 3,
        explanation: "William of Normandy defeated Harold Godwinson at Hastings in 1066."
      },
      {
        text: "Who was the first emperor of unified China?",
        options: ["Qin Shi Huang", "Kublai Khan", "Sun Yat-sen", "Emperor Wu of Han"],
        answerIndex: 0,
        explanation: "Qin Shi Huang unified China in 221 BCE and founded the Qin dynasty."
      },
      {
        text: "Which empire was ruled from Constantinople after the western Roman Empire fell?",
        options: ["Ottoman Empire", "Carolingian Empire", "Mughal Empire", "Byzantine Empire"],
        answerIndex: 3,
        explanation: "The Byzantine Empire was the eastern continuation of the Roman Empire."
      },
      {
        text: "The Haitian Revolution began in 1791 on the colony then known by what name?",
        options: ["Saint-Domingue", "New Granada", "Louisiana", "Martinique"],
        answerIndex: 0,
        explanation: "Saint-Domingue became independent Haiti after the revolution."
      },
      {
        text: "Which ruler issued the Edict of Milan in 313 CE, tolerating Christianity in the Roman Empire?",
        options: ["Nero", "Justinian I", "Constantine I", "Diocletian"],
        answerIndex: 2,
        explanation: "Constantine and Licinius issued the Edict of Milan in 313 CE."
      },
      {
        text: "The Meiji Restoration began in which year?",
        options: ["1815", "1848", "1868", "1905"],
        answerIndex: 2,
        explanation: "The Meiji Restoration of 1868 transformed Japan's political and social order."
      },
      {
        text: "Which treaty formally ended the Thirty Years' War in 1648?",
        options: ["Peace of Westphalia", "Treaty of Utrecht", "Treaty of Tordesillas", "Treaty of Paris"],
        answerIndex: 0,
        explanation: "The Peace of Westphalia ended the Thirty Years' War and reshaped European diplomacy."
      },
      {
        text: "Mansa Musa, famous for an extraordinary pilgrimage to Mecca, ruled which empire?",
        options: ["Songhai Empire", "Kingdom of Kongo", "Mali Empire", "Aksumite Empire"],
        answerIndex: 2,
        explanation: "Mansa Musa ruled the Mali Empire in the 14th century."
      },
      {
        text: "Which pre-Columbian city, near modern Mexico City, was one of the largest urban centres in the world around 500 CE?",
        options: ["Tikal", "Chichen Itza", "Cuzco", "Teotihuacan"],
        answerIndex: 3,
        explanation: "Teotihuacan was a vast Mesoamerican city long before the Aztec capital Tenochtitlan."
      }
    ]
  },
  {
    id: "harry-potter",
    title: "Harry Potter",
    shortTitle: "Potter",
    tone: "Book and film knowledge: spells, characters, Hogwarts details, and memory under pressure.",
    theme: "lantern",
    questions: [
      {
        text: "What is the spell most famously used to disarm an opponent?",
        options: ["Lumos", "Alohomora", "Obliviate", "Expelliarmus"],
        answerIndex: 3,
        explanation: "Expelliarmus is the Disarming Charm and becomes one of Harry's signature spells."
      },
      {
        text: "Which Hogwarts house is Luna Lovegood sorted into?",
        options: ["Ravenclaw", "Hufflepuff", "Gryffindor", "Slytherin"],
        answerIndex: 0,
        explanation: "Luna is a Ravenclaw, known for intelligence, originality, and wit."
      },
      {
        text: "What type of creature is Buckbeak?",
        options: ["Thestral", "Hippogriff", "Phoenix", "Basilisk"],
        answerIndex: 1,
        explanation: "Buckbeak is a hippogriff, introduced in Care of Magical Creatures."
      },
      {
        text: "Which platform does the Hogwarts Express leave from?",
        options: ["Platform 7 1/2", "Platform 8 3/4", "Platform 9 3/4", "Platform 10 1/2"],
        answerIndex: 2,
        explanation: "The Hogwarts Express departs from Platform 9 3/4 at King's Cross."
      },
      {
        text: "Who gives Harry the Marauder's Map?",
        options: ["Sirius Black", "Fred and George Weasley", "Remus Lupin", "Albus Dumbledore"],
        answerIndex: 1,
        explanation: "Fred and George pass the map to Harry in Prisoner of Azkaban."
      },
      {
        text: "What is the core of Harry Potter's wand?",
        options: ["Dragon heartstring", "Unicorn hair", "Phoenix feather", "Basilisk fang"],
        answerIndex: 2,
        explanation: "Harry's wand contains a phoenix feather, as does Voldemort's."
      },
      {
        text: "Which professor teaches Herbology during Harry's school years?",
        options: ["Professor Sinistra", "Professor Vector", "Professor Burbage", "Professor Sprout"],
        answerIndex: 3,
        explanation: "Pomona Sprout is Hogwarts' Herbology professor and head of Hufflepuff."
      },
      {
        text: "What is the name of the Black family house that becomes Order headquarters?",
        options: ["Number Twelve, Grimmauld Place", "Spinner's End", "Godric's Hollow", "Shell Cottage"],
        answerIndex: 0,
        explanation: "The Order uses Number Twelve, Grimmauld Place as a hidden headquarters."
      },
      {
        text: "In the books, what shape is Hermione's Patronus?",
        options: ["Hare", "Doe", "Swan", "Otter"],
        answerIndex: 3,
        explanation: "Hermione's Patronus is an otter."
      },
      {
        text: "Who originally owned the invisibility cloak before it passed to James Potter and then Harry?",
        options: ["Ignotus Peverell", "Antioch Peverell", "Cadmus Peverell", "Nicolas Flamel"],
        answerIndex: 0,
        explanation: "The cloak is associated with Ignotus Peverell, the youngest of the three brothers."
      }
    ]
  },
  {
    id: "biological-facts",
    title: "Biological Facts",
    shortTitle: "Biology",
    tone: "Living systems: anatomy, animals, plants, genetics, evolution, and ecology.",
    theme: "biology",
    questions: [
      {
        text: "Which organ pumps blood around the human body?",
        options: ["Liver", "Lungs", "Heart", "Kidneys"],
        answerIndex: 2,
        explanation: "The heart pumps blood through the circulatory system."
      },
      {
        text: "What is the basic unit of heredity?",
        options: ["Gene", "Neuron", "Hormone", "Enzyme"],
        answerIndex: 0,
        explanation: "Genes are stretches of DNA that influence inherited traits."
      },
      {
        text: "Which gas do plants take in for photosynthesis?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"],
        answerIndex: 2,
        explanation: "Plants use carbon dioxide and water to make sugars during photosynthesis."
      },
      {
        text: "What is the largest living species of lizard?",
        options: ["Gila monster", "Komodo dragon", "Green iguana", "Nile monitor"],
        answerIndex: 1,
        explanation: "The Komodo dragon is the largest living lizard species."
      },
      {
        text: "Which part of a neuron typically receives incoming signals from other neurons?",
        options: ["Axon terminal", "Myelin sheath", "Dendrite", "Synaptic vesicle"],
        answerIndex: 2,
        explanation: "Dendrites receive many incoming signals and pass them toward the cell body."
      },
      {
        text: "What is the term for the mutual evolution of two interacting species influencing each other?",
        options: ["Coevolution", "Convergence", "Succession", "Speciation"],
        answerIndex: 0,
        explanation: "Coevolution can occur between predators and prey, parasites and hosts, or flowers and pollinators."
      },
      {
        text: "Which blood cells are primarily responsible for carrying oxygen?",
        options: ["Platelets", "Red blood cells", "B lymphocytes", "Neutrophils"],
        answerIndex: 1,
        explanation: "Red blood cells carry oxygen using the protein haemoglobin."
      },
      {
        text: "In Mendelian genetics, what genotype is represented by two different alleles for a gene?",
        options: ["Homozygous", "Heterozygous", "Polyploid", "Hemizygous"],
        answerIndex: 1,
        explanation: "A heterozygous genotype has two different alleles, such as Aa."
      },
      {
        text: "What type of ecological relationship benefits one species while leaving the other largely unaffected?",
        options: ["Mutualism", "Parasitism", "Commensalism", "Competition"],
        answerIndex: 2,
        explanation: "Commensalism benefits one organism without significantly helping or harming the other."
      },
      {
        text: "Which enzyme unwinds the DNA double helix during replication?",
        options: ["DNA ligase", "RNA polymerase", "Helicase", "Amylase"],
        answerIndex: 2,
        explanation: "Helicase separates the DNA strands so replication machinery can copy them."
      }
    ]
  },
  {
    id: "gaming",
    title: "Gaming",
    shortTitle: "Gaming",
    tone: "Hardware, studios, genres, design ideas, characters, and industry history.",
    theme: "arcade",
    questions: [
      {
        text: "Which company created the PlayStation console brand?",
        options: ["Nintendo", "Sega", "Sony", "Microsoft"],
        answerIndex: 2,
        explanation: "Sony launched the original PlayStation in the 1990s."
      },
      {
        text: "Which Nintendo character is known for wearing a red cap with an M?",
        options: ["Link", "Mario", "Kirby", "Fox McCloud"],
        answerIndex: 1,
        explanation: "Mario is Nintendo's moustached plumber and platforming icon."
      },
      {
        text: "What genre is usually defined by permanent death and procedurally generated runs?",
        options: ["Roguelike", "Visual novel", "4X strategy", "Rhythm game"],
        answerIndex: 0,
        explanation: "Roguelikes are strongly associated with permadeath and procedural generation."
      },
      {
        text: "Which studio developed The Witcher 3: Wild Hunt?",
        options: ["BioWare", "Bethesda Game Studios", "CD Projekt Red", "Remedy Entertainment"],
        answerIndex: 2,
        explanation: "The Witcher 3 was developed by Polish studio CD Projekt Red."
      },
      {
        text: "What was the pack-in game that helped popularise the Nintendo Game Boy worldwide?",
        options: ["Super Mario Land", "Tetris", "Metroid II", "Dr. Mario"],
        answerIndex: 1,
        explanation: "Tetris was bundled with many Game Boy units and became central to its success."
      },
      {
        text: "Which game popularised the term 'bullet time' in third-person action games?",
        options: ["Max Payne", "Deus Ex", "Metal Gear Solid", "Half-Life"],
        answerIndex: 0,
        explanation: "Max Payne made slow-motion gunplay a signature mechanic."
      },
      {
        text: "Which engine is strongly associated with Fortnite and is widely licensed across the games industry?",
        options: ["Source", "Unreal Engine", "Frostbite", "Creation Engine"],
        answerIndex: 1,
        explanation: "Epic Games develops both Fortnite and Unreal Engine."
      },
      {
        text: "In game design, what does 'I-frames' usually refer to?",
        options: ["Internet animation frames", "Invincibility frames after an action or hit", "Inventory frame slots", "Instruction frames in a tutorial"],
        answerIndex: 1,
        explanation: "Invincibility frames briefly prevent damage, often during dodges or recovery."
      },
      {
        text: "Which 1980 arcade game is famous for showing short intermission scenes between levels?",
        options: ["Galaga", "Donkey Kong", "Pac-Man", "Defender"],
        answerIndex: 2,
        explanation: "Pac-Man's animated intermissions are a landmark example of early arcade storytelling."
      },
      {
        text: "Which graphics technique renders fewer pixels in less noticeable areas, often guided by where the player is looking in VR?",
        options: ["Ray marching", "Foveated rendering", "Mipmapping", "Bump mapping"],
        answerIndex: 1,
        explanation: "Foveated rendering concentrates detail near the viewer's gaze and reduces work elsewhere."
      }
    ]
  }
];
