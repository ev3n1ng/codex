const featuredWords = [
  {
    word: "Apricity",
    pronunciation: "uh-PRIS-i-tee",
    difficulty: "Rare",
    tone: "nature",
    description: "The warmth of sunlight in winter; a small, bright comfort on a cold day.",
    usage: "Use it when the sun itself feels like the event, especially in chilly weather.",
    etymology: "From Latin apricitas, meaning warmth from the sun, through apricus: sunny or exposed to sunlight.",
    example: "We sat by the window, borrowing a little apricity from the pale afternoon.",
    tags: ["light", "winter", "comfort", "sun"]
  },
  {
    word: "Petrichor",
    pronunciation: "PET-ri-kor",
    difficulty: "Familiar",
    tone: "nature",
    description: "The earthy smell that rises when rain falls on dry ground.",
    usage: "Useful for describing the first rain after a dry spell, or a memory triggered by weather.",
    etymology: "Coined in the 1960s from Greek petra, stone, and ichor, the mythical fluid of the gods.",
    example: "The pavement darkened, and petrichor drifted through the open kitchen door.",
    tags: ["rain", "smell", "earth", "weather"]
  },
  {
    word: "Susurrus",
    pronunciation: "soo-SUR-us",
    difficulty: "Rare",
    tone: "nature",
    description: "A soft whispering, rustling, or murmuring sound.",
    usage: "Best for quiet sounds that feel continuous: leaves, fabric, distant voices, or water.",
    etymology: "From Latin susurrus, a humming, whispering, or murmuring sound.",
    example: "A susurrus of pages moved through the reading room whenever the door opened.",
    tags: ["sound", "quiet", "whisper", "leaves"]
  },
  {
    word: "Sonder",
    pronunciation: "SON-der",
    difficulty: "Modern",
    tone: "feeling",
    description: "The sudden awareness that every passer-by has a life as vivid and complex as your own.",
    usage: "Use it for moments when strangers stop feeling like background characters.",
    etymology: "A modern coined word popularised by The Dictionary of Obscure Sorrows.",
    example: "At the station, sonder arrived with the crowd: each face carrying a private weather.",
    tags: ["people", "empathy", "city", "modern"]
  },
  {
    word: "Liminal",
    pronunciation: "LIM-in-uhl",
    difficulty: "Useful",
    tone: "thought",
    description: "Relating to a threshold or transition; neither fully one thing nor the next.",
    usage: "Use it for in-between places, states, times, and identities.",
    etymology: "From Latin limen, meaning threshold.",
    example: "Dawn made the airport feel liminal, as if everyone had paused between lives.",
    tags: ["threshold", "change", "transition", "place"]
  },
  {
    word: "Eldritch",
    pronunciation: "EL-drich",
    difficulty: "Expressive",
    tone: "feeling",
    description: "Strange, uncanny, and faintly supernatural in a way that unsettles the imagination.",
    usage: "Good for eerie places, sounds, stories, or moods that feel older than explanation.",
    etymology: "Probably from Scots and Middle English roots connected with foreignness or the otherworldly.",
    example: "The old lift made an eldritch groan before deciding to move.",
    tags: ["strange", "eerie", "uncanny", "story"]
  },
  {
    word: "Ineffable",
    pronunciation: "in-EF-uh-buhl",
    difficulty: "Useful",
    tone: "thought",
    description: "Too great, subtle, or intense to be fully expressed in words.",
    usage: "Use it when ordinary description feels too small for the feeling or experience.",
    etymology: "From Latin ineffabilis: not able to be spoken.",
    example: "There was an ineffable hush after the final note disappeared.",
    tags: ["speech", "feeling", "mystery", "art"]
  },
  {
    word: "Numinous",
    pronunciation: "NOO-mi-nus",
    difficulty: "Rare",
    tone: "feeling",
    description: "Filled with a sense of spiritual mystery, awe, or presence.",
    usage: "Best for experiences that feel sacred without needing to be religious.",
    etymology: "From Latin numen, a divine will, presence, or spirit.",
    example: "The empty chapel felt numinous in the blue hour.",
    tags: ["awe", "sacred", "mystery", "presence"]
  },
  {
    word: "Palimpsest",
    pronunciation: "PAL-imp-sest",
    difficulty: "Scholarly",
    tone: "thought",
    description: "Something reused or altered that still shows traces of its earlier forms.",
    usage: "Use it for cities, memories, manuscripts, buildings, or identities with visible layers.",
    etymology: "From Greek palimpsestos, meaning scraped again, originally referring to reused writing material.",
    example: "The street was a palimpsest of shop signs, old brick, and newer glass.",
    tags: ["layers", "history", "memory", "city"]
  },
  {
    word: "Halcyon",
    pronunciation: "HAL-see-un",
    difficulty: "Literary",
    tone: "feeling",
    description: "Calm, peaceful, and often nostalgically happy.",
    usage: "Often appears in the phrase halcyon days, meaning an idealised peaceful past.",
    etymology: "From Greek myth, where the halcyon bird was believed to calm the sea during nesting.",
    example: "They remembered those halcyon summers as if every evening had been golden.",
    tags: ["calm", "peace", "memory", "summer"]
  },
  {
    word: "Verdant",
    pronunciation: "VUR-dunt",
    difficulty: "Useful",
    tone: "nature",
    description: "Green with growing plants; fresh, leafy, and alive.",
    usage: "A strong adjective for landscapes, gardens, hills, and newly thriving things.",
    etymology: "From Old French verdoyant, from Latin viridis, green.",
    example: "After weeks of rain, the common turned suddenly verdant.",
    tags: ["green", "growth", "garden", "fresh"]
  },
  {
    word: "Mellifluous",
    pronunciation: "meh-LIF-loo-us",
    difficulty: "Expressive",
    tone: "feeling",
    description: "Sweet, smooth, and pleasant to hear.",
    usage: "Use it for voices, music, languages, or sentences that flow beautifully.",
    etymology: "From Latin mel, honey, and fluere, to flow.",
    example: "Her mellifluous reading made the recipe sound like a poem.",
    tags: ["sound", "voice", "music", "sweet"]
  },
  {
    word: "Quiddity",
    pronunciation: "KWID-i-tee",
    difficulty: "Scholarly",
    tone: "thought",
    description: "The essential nature or defining quality of something; its whatness.",
    usage: "Useful when you want to talk about the exact character that makes a thing itself.",
    etymology: "From Medieval Latin quidditas, from Latin quid, meaning what.",
    example: "The quiddity of the cafe was not the coffee, but the hour everyone lingered.",
    tags: ["essence", "nature", "philosophy", "identity"]
  },
  {
    word: "Lacuna",
    pronunciation: "luh-KOO-nuh",
    difficulty: "Useful",
    tone: "thought",
    description: "A gap, missing part, or blank space in a text, memory, record, or argument.",
    usage: "Use it when an absence matters as much as what is present.",
    etymology: "From Latin lacuna, meaning pit, hollow, pool, or gap.",
    example: "There was a lacuna in the family story where her grandfather's youth should have been.",
    tags: ["gap", "absence", "memory", "text"]
  },
  {
    word: "Brumal",
    pronunciation: "BROO-muhl",
    difficulty: "Rare",
    tone: "nature",
    description: "Belonging to winter; wintry in mood, light, or weather.",
    usage: "A compact alternative to wintry, especially when you want a more poetic register.",
    etymology: "From Latin bruma, the winter solstice or wintertime.",
    example: "A brumal light lay over the fields long after breakfast.",
    tags: ["winter", "cold", "light", "season"]
  },
  {
    word: "Solivagant",
    pronunciation: "so-LIV-uh-gunt",
    difficulty: "Rare",
    tone: "feeling",
    description: "Wandering alone; moving through the world in solitary travel.",
    usage: "Use it for someone who roams without company, either literally or emotionally.",
    etymology: "From Latin solus, alone, and vagari, to wander.",
    example: "He was solivagant by habit, happiest on streets where nobody knew his name.",
    tags: ["alone", "wander", "travel", "solitude"]
  },
  {
    word: "Anfractuous",
    pronunciation: "an-FRAK-choo-us",
    difficulty: "Rare",
    tone: "thought",
    description: "Full of twists, turns, and winding complexity.",
    usage: "Works for paths, arguments, plots, or bureaucratic processes that refuse a straight line.",
    etymology: "From Latin anfractus, a bending around or winding.",
    example: "The anfractuous footpath eventually found the river by refusing every direct route.",
    tags: ["winding", "complex", "path", "argument"]
  },
  {
    word: "Komorebi",
    pronunciation: "koh-moh-REH-bee",
    difficulty: "Borrowed",
    tone: "nature",
    description: "A Japanese word for sunlight filtering through leaves.",
    usage: "Use it as a borrowed word when English feels too clumsy for that dappled light.",
    etymology: "From Japanese elements for tree, leaking or filtering through, and sunlight.",
    example: "Komorebi trembled over the table as the branches moved outside.",
    tags: ["light", "leaves", "borrowed", "sun"]
  }
];

const supplementalWordRecords = [{"word":"engrossing","pos":"adj","definition":"Utterly consuming one's time and attention.","topic":"interesting"},{"word":"absorbing","pos":"adj","definition":"Engrossing, that sustains someone's interest.","topic":"interesting"},{"word":"riveting","pos":"adj","definition":"Commanding the attention of spectators.","topic":"interesting"},{"word":"gorgeous","pos":"adj","definition":"(of a person or place, sometimes endearing) Very beautiful.","topic":"beautiful"},{"word":"sightly","pos":"adj","definition":"Attractive, pleasing to the eye; affording gratification to the sense of sight; aesthetically pleasing.","topic":"beautiful"},{"word":"comely","pos":"adj","definition":"Attractive; visually pleasing; good-looking.","topic":"beautiful"},{"word":"beauteous","pos":"adj","definition":"(literary, formal or poetic) beautiful.","topic":"beautiful"},{"word":"lovely","pos":"adj","definition":"Delightful for beauty, harmony, or grace.","topic":"beautiful"},{"word":"ravishing","pos":"adj","definition":"Extremely beautiful","topic":"beautiful"},{"word":"handsome","pos":"adj","definition":"Having a pleasing appearance, good-looking, attractive.","topic":"beautiful"},{"word":"splendiferous","pos":"adj","definition":"Beautiful, splendid.","topic":"beautiful"},{"word":"exquisite","pos":"adj","definition":"Especially or extraordinarily fine or pleasing; exceptional.","topic":"beautiful"},{"word":"fascinating","pos":"adj","definition":"Having interesting qualities; captivating; attractive.","topic":"interesting"},{"word":"intriguing","pos":"adj","definition":"Causing a desire to know more; mysterious.","topic":"interesting"},{"word":"glorious","pos":"adj","definition":"Exhibiting attributes, qualities, or acts that are worthy of or receive glory.","topic":"beautiful"},{"word":"gripping","pos":"adj","definition":"Which catches someone's attention; exciting","topic":"interesting"},{"word":"aesthetic","pos":"adj","definition":"Concerned with beauty, artistic effect, or appearance.","topic":"beautiful"},{"word":"esthetical","pos":"adj","definition":"Of or pertaining to beauty.","topic":"beautiful"},{"word":"aesthetical","pos":"adj","definition":"Of or pertaining to beauty.","topic":"beautiful"},{"word":"unputdownable","pos":"adj","definition":"(specifically) Of a book or other written work: so captivating or engrossing that one cannot bear to stop reading it.","topic":"interesting"},{"word":"newsworthy","pos":"adj","definition":"Interesting enough to be reported as a news","topic":"interesting"},{"word":"stunning","pos":"adj","definition":"(informal) Exceptionally beautiful or attractive.","topic":"beautiful"},{"word":"splendid","pos":"adj","definition":"Gorgeous; magnificent; sumptuous; of remarkable beauty.","topic":"beautiful"},{"word":"scenic","pos":"adj","definition":"having beautiful scenery; picturesque","topic":"beautiful"},{"word":"esthetic","pos":"adj","definition":"(US) Alternative spelling of aesthetic. [Concerned with beauty, artistic effect, or appearance.]","topic":"beautiful"},{"word":"resplendent","pos":"adj","definition":"Shiny and colourful, and thus pleasing to the eye.","topic":"beautiful"},{"word":"bonny","pos":"adj","definition":"(Geordie) Alternative spelling of bonnie (\"attractive\"). [Merry; happy.]","topic":"beautiful"},{"word":"bonnie","pos":"adj","definition":"(Scotland, Geordie) Beautiful; pretty; attractive; handsome.","topic":"beautiful"},{"word":"important","pos":"adj","definition":"Having relevant and crucial value; having import.","topic":"interesting"},{"word":"meaningful","pos":"adj","definition":"Having meaning, significant.","topic":"interesting"},{"word":"remarkable","pos":"adj","definition":"Worthy of remark; notable; interesting.","topic":"interesting"},{"word":"noteworthy","pos":"adj","definition":"Deserving attention; notable; worthy of notice.","topic":"interesting"},{"word":"notable","pos":"adj","definition":"Worthy of note; remarkable; memorable; noted or distinguished.","topic":"interesting"},{"word":"significant","pos":"adj","definition":"Having a noticeable or major effect.","topic":"interesting"},{"word":"relevance","pos":"n","definition":"The property or state of being relevant or pertinent.","topic":"interesting"},{"word":"sensible","pos":"adj","definition":"Acting with or showing good sense; able to make good judgements based on reason or wisdom, or reflecting such ability.","topic":"interesting"},{"word":"relevant","pos":"adj","definition":"Related, connected, or pertinent to a topic.","topic":"interesting"},{"word":"thoughtful","pos":"adj","definition":"Demonstrating kindness or consideration for others.","topic":"interesting"},{"word":"pertinent","pos":"adj","definition":"Important with regard to (a subject or matter); pertaining; relevant.","topic":"interesting"},{"word":"insightful","pos":"adj","definition":"Possessing insight; percipient.","topic":"interesting"},{"word":"promising","pos":"adj","definition":"Showing promise, and likely to develop in a desirable fashion.","topic":"interesting"},{"word":"noticeable","pos":"adj","definition":"Capable of being seen or noticed.","topic":"interesting"},{"word":"worthwhile","pos":"adj","definition":"Good and important enough to spend time, effort, or money on.","topic":"interesting"},{"word":"impressive","pos":"adj","definition":"Making, or tending to make, a positive impression; having power to impress.","topic":"interesting"},{"word":"positive","pos":"adj","definition":"Included, present, characterized by affirmation.","topic":"interesting"},{"word":"valuable","pos":"adj","definition":"Having a great value.","topic":"interesting"},{"word":"value","pos":"n","definition":"The quality that renders something desirable or valuable; worth.","topic":"interesting"},{"word":"enlightening","pos":"adj","definition":"Serving to enlighten.","topic":"interesting"},{"word":"worth","pos":"adj","definition":"Having a value of; proper to be exchanged for.","topic":"interesting"},{"word":"useful","pos":"adj","definition":"Having a practical or beneficial use.","topic":"interesting"},{"word":"worthy","pos":"adj","definition":"Having worth, merit, or value.","topic":"interesting"},{"word":"advantageous","pos":"adj","definition":"Being of advantage, beneficial.","topic":"interesting"},{"word":"beneficial","pos":"adj","definition":"Helpful or good to something or someone.","topic":"interesting"},{"word":"favourable","pos":"adj","definition":"Expressing or indicating favour or goodwill; approving, encouraging.","topic":"interesting"},{"word":"inspiring","pos":"adj","definition":"Providing inspiration; encouraging; stimulating.","topic":"interesting"},{"word":"informative","pos":"adj","definition":"Providing information; especially, providing useful or interesting information.","topic":"interesting"},{"word":"merit","pos":"n","definition":"(countable, uncountable) Something deserving or worthy of positive recognition or reward.","topic":"interesting"},{"word":"pertaining","pos":"n","definition":"Something that pertains; an appurtenance.","topic":"interesting"},{"word":"excellent","pos":"adj","definition":"Of higher or the highest quality; splendid.","topic":"interesting"},{"word":"inquisitive","pos":"adj","definition":"Eager to acquire knowledge; acquisitive.","topic":"interesting"},{"word":"instructive","pos":"adj","definition":"Conveying knowledge, information or instruction.","topic":"interesting"},{"word":"curious","pos":"adj","definition":"Tending to ask questions, or to want to explore or investigate; inquisitive; (with a negative connotation) nosy, prying.","topic":"interesting"},{"word":"helpful","pos":"adj","definition":"Furnishing help; giving aid; useful.","topic":"interesting"},{"word":"concern","pos":"n","definition":"That which affects one’s welfare or happiness. A matter of interest to someone.","topic":"interesting"},{"word":"relating","pos":"n","definition":"The act of relating, or forming or identifying relationships; relation.","topic":"interesting"},{"word":"welcome","pos":"adj","definition":"Whose arrival is a cause of joy; received with gladness; admitted willingly to the house, entertainment, or company.","topic":"interesting"},{"word":"rewarding","pos":"adj","definition":"Giving or resulting in reward or satisfaction.","topic":"interesting"},{"word":"affecting","pos":"adj","definition":"Producing or causing strong feelings and emotions.","topic":"interesting"},{"word":"related","pos":"adj","definition":"Standing in relation or connection.","topic":"interesting"},{"word":"desirable","pos":"adj","definition":"Worthy to be desired; pleasing; agreeable.","topic":"interesting"},{"word":"great","pos":"adj","definition":"(informal) Very good; excellent; wonderful; fantastic.","topic":"interesting"},{"word":"pleasing","pos":"adj","definition":"Agreeable; giving pleasure, cheer, enjoyment or gratification.","topic":"interesting"},{"word":"compelling","pos":"adj","definition":"very interesting; able to capture and hold one's attention","topic":"interesting"},{"word":"engaging","pos":"adj","definition":"Tending to engage attention or interest; engrossing, interesting; enthralling.","topic":"interesting"},{"word":"pleasant","pos":"adj","definition":"Giving pleasure; pleasing in manner.","topic":"interesting"},{"word":"enjoyable","pos":"adj","definition":"Pleasant, capable of giving pleasure.","topic":"interesting"},{"word":"refreshing","pos":"adj","definition":"That refreshes someone; pleasantly fresh and different; granting vitality and energy.","topic":"interesting"},{"word":"beauty","pos":"adj","definition":"(Canada) Of high quality, well done.","topic":"beautiful"},{"word":"purty","pos":"adj","definition":"(informal) Pronunciation spelling of pretty. [Pleasant to the sight or other senses; attractive, especially of women or children.]","topic":"beautiful"},{"word":"breathtaking","pos":"adj","definition":"stunningly beautiful; amazing","topic":"beautiful"},{"word":"profitable","pos":"adj","definition":"Producing a profit.","topic":"interesting"},{"word":"stylish","pos":"adj","definition":"Having elegance or taste or refinement in manners or dress.","topic":"beautiful"},{"word":"charming","pos":"adj","definition":"Pleasant, charismatic.","topic":"beautiful"},{"word":"enchanting","pos":"adj","definition":"Having the ability to enchant; charming, delightful.","topic":"beautiful"},{"word":"glamorous","pos":"adj","definition":"Having glamour; stylish.","topic":"beautiful"},{"word":"elegant","pos":"adj","definition":"Characterised by or exhibiting elegance.","topic":"beautiful"},{"word":"graceful","pos":"adj","definition":"Having or showing grace in movement, shape, or proportion.","topic":"beautiful"},{"word":"dainty","pos":"adj","definition":"Elegant; delicately small and pretty.","topic":"beautiful"},{"word":"magnificent","pos":"adj","definition":"Grand, elegant or splendid in appearance.","topic":"beautiful"},{"word":"wonderfully","pos":"adv","definition":"In an excellent manner.","topic":"beautiful"},{"word":"adorable","pos":"adj","definition":"Befitting of being adored; cute or loveable.","topic":"beautiful"},{"word":"stimulating","pos":"adj","definition":"Having a manner that stimulates; serving to stimulate.","topic":"interesting"},{"word":"lively","pos":"adj","definition":"Full of life; energetic, vivacious.","topic":"interesting"},{"word":"loving","pos":"adj","definition":"Expressing a large amount of love to other people; affectionate.","topic":"beautiful"},{"word":"fancy","pos":"adj","definition":"Decorative, or featuring decorations, especially intricate or diverse ones.","topic":"beautiful"},{"word":"majestic","pos":"adj","definition":"Having qualities of splendor or royalty.","topic":"beautiful"},{"word":"strange","pos":"adj","definition":"Not normal; odd, unusual, surprising, out of the ordinary, often with a negative connotation.","topic":"interesting"},{"word":"contender","pos":"n","definition":"Someone who competes with one or more other people.","topic":"interesting"},{"word":"precious","pos":"adj","definition":"Of high value or worth.","topic":"beautiful"},{"word":"marvellous","pos":"adj","definition":"(British spelling) Exciting wonder or surprise; astonishing; wonderful.","topic":"beautiful"},{"word":"wondrous","pos":"adj","definition":"Wonderful; amazing, inspiring awe; marvelous.","topic":"beautiful"},{"word":"marvelous","pos":"adj","definition":"(American spelling) Exciting wonder or surprise; astonishing; wonderful.","topic":"beautiful"},{"word":"darling","pos":"n","definition":"Often used as an affectionate term of address: a person who is very dear to one.","topic":"beautiful"},{"word":"tremendous","pos":"adj","definition":"Notable for its size, power, or excellence.","topic":"beautiful"},{"word":"sweetheart","pos":"n","definition":"A person very much liked or loved by someone, especially when both partners are young.","topic":"beautiful"},{"word":"wonderful","pos":"adj","definition":"Surprisingly excellent; very good or admirable, extremely impressive.","topic":"beautiful"},{"word":"jolly","pos":"adj","definition":"Full of merriment and high spirits; jovial; joyous; merry.","topic":"beautiful"},{"word":"gracious","pos":"adj","definition":"kind and warmly courteous","topic":"beautiful"},{"word":"spectacular","pos":"adj","definition":"Amazing or worthy of special notice.","topic":"beautiful"},{"word":"prized","pos":"adj","definition":"Highly valued, cherished.","topic":"beautiful"},{"word":"sweetie","pos":"n","definition":"(often as a term of address) A person who is much loved.","topic":"beautiful"},{"word":"appealing","pos":"adj","definition":"Having appeal; attractive.","topic":"interesting"},{"word":"superb","pos":"adj","definition":"First-rate; of the highest quality; exceptionally good.","topic":"beautiful"},{"word":"challenging","pos":"adj","definition":"Difficult, hard to do.","topic":"interesting"},{"word":"lavish","pos":"adj","definition":"Expending or bestowing profusely; profuse; prodigal.","topic":"beautiful"},{"word":"exciting","pos":"adj","definition":"Creating or producing excitement.","topic":"interesting"},{"word":"grandiose","pos":"adj","definition":"Large and impressive, in size, scope or extent.","topic":"beautiful"},{"word":"grand","pos":"adj","definition":"Of a large size or extent; great.","topic":"beautiful"},{"word":"fantastic","pos":"adj","definition":"Wonderful; marvelous; excellent; extraordinarily good or great (used especially as an intensifier).","topic":"beautiful"},{"word":"mighty","pos":"adj","definition":"Very strong; possessing might.","topic":"beautiful"},{"word":"attractive","pos":"adj","definition":"Pleasing or appealing to the senses, especially of a potential romantic partner.","topic":"interesting"},{"word":"belle","pos":"n","definition":"An attractive woman.","topic":"beautiful"},{"word":"extraordinary","pos":"adj","definition":"Not ordinary; exceptional; unusual.","topic":"beautiful"},{"word":"outstanding","pos":"adj","definition":"Exceptionally good; distinguished from others by its superiority.","topic":"beautiful"},{"word":"comfy","pos":"adj","definition":"(informal) Comfortable.","topic":"beautiful"},{"word":"nicely","pos":"adv","definition":"Pleasantly; satisfactorily.","topic":"beautiful"},{"word":"entertaining","pos":"adj","definition":"Very amusing; that entertains.","topic":"interesting"},{"word":"brave","pos":"adj","definition":"Strong in the face of fear; courageous.","topic":"beautiful"},{"word":"admirable","pos":"adj","definition":"Deserving of the highest esteem or admiration; estimable.","topic":"beautiful"},{"word":"lofty","pos":"adj","definition":"High, tall, having great height or stature.","topic":"beautiful"},{"word":"appetizing","pos":"adj","definition":"That appeals to, or stimulates the appetite.","topic":"beautiful"},{"word":"ideal","pos":"adj","definition":"Optimal; being the best possibility.","topic":"beautiful"},{"word":"dreamy","pos":"adj","definition":"As in a dream; resembling a dream.","topic":"beautiful"},{"word":"funny","pos":"adj","definition":"Amusing; humorous; comical.","topic":"interesting"},{"word":"delicious","pos":"adj","definition":"Pleasing to the sense of taste; tasty.","topic":"beautiful"},{"word":"perfect","pos":"adj","definition":"Without fault or mistake; without flaw, of supreme quality.","topic":"beautiful"},{"word":"daring","pos":"adj","definition":"Adventurous, willing to take on or look for risks; overbold.","topic":"beautiful"},{"word":"concerning","pos":"adj","definition":"Causing concern; worrying.","topic":"interesting"},{"word":"noble","pos":"adj","definition":"Having honorable qualities; having moral eminence and freedom from anything petty, mean or dubious in conduct and character.","topic":"beautiful"},{"word":"illuminating","pos":"adj","definition":"(figuratively) Providing clarification or explanation; educational, revealing.","topic":"interesting"},{"word":"smooth","pos":"adj","definition":"Having a texture that lacks friction. Not rough.","topic":"beautiful"},{"word":"fitting","pos":"adj","definition":"Appropriate; suitable.","topic":"beautiful"},{"word":"sleek","pos":"adj","definition":"Having an even, smooth surface; smooth","topic":"beautiful"},{"word":"pious","pos":"adj","definition":"Of or pertaining to piety, exhibiting piety, devout, god-fearing.","topic":"beautiful"},{"word":"nasty","pos":"adj","definition":"Contemptible, unpleasant (of a person).","topic":"beautiful"},{"word":"divine","pos":"adj","definition":"Of or pertaining to a god.","topic":"beautiful"},{"word":"dazzling","pos":"adj","definition":"Extremely bright, especially so as to blind the eyes temporarily; bright to the degree that dazzles.","topic":"beautiful"},{"word":"juicy","pos":"adj","definition":"Having lots of juice.","topic":"interesting"},{"word":"heavenly","pos":"adj","definition":"(figurative) Strongly or sublimely beautiful or pleasurable.","topic":"beautiful"},{"word":"brilliant","pos":"adj","definition":"Highly intelligent.","topic":"beautiful"},{"word":"piece","pos":"n","definition":"A part of a larger whole, usually in such a form that it is able to be separated from other parts.","topic":"beautiful"},{"word":"bright","pos":"adj","definition":"Emitting much light; visually dazzling; luminous, lucent, radiant.","topic":"beautiful"},{"word":"priceless","pos":"adj","definition":"(figuratively, comparable) Held in high regard; treasured.","topic":"beautiful"},{"word":"smashing","pos":"adj","definition":"(originally US, now British and Ireland) Wonderful, very good or impressive.","topic":"beautiful"},{"word":"leggy","pos":"adj","definition":"(UK, US, chiefly of a woman) Having long, attractive legs; long-legged.","topic":"beautiful"},{"word":"unabated","pos":"adj","definition":"Continuing at full strength or intensity.","topic":"beautiful"},{"word":"incredible","pos":"adj","definition":"(figurative) Amazing; astonishing; awe-inspiring.","topic":"beautiful"},{"word":"irresistible","pos":"adj","definition":"Impossible to resist.","topic":"beautiful"},{"word":"quite","pos":"adv","definition":"To the greatest extent or degree; completely, entirely.","topic":"beautiful"},{"word":"impeccable","pos":"adj","definition":"Perfect, without faults, flaws or errors","topic":"beautiful"},{"word":"fuzzy","pos":"adj","definition":"Vague or imprecise.","topic":"beautiful"},{"word":"sunny","pos":"adj","definition":"(of weather or a day) Featuring a lot of sunshine.","topic":"beautiful"},{"word":"radiant","pos":"adj","definition":"Radiating light and/or heat.","topic":"beautiful"},{"word":"blondie","pos":"n","definition":"A sweet, chewy, generally vanilla-flavoured and chocolate-free baked good: a blond-colored brownie.","topic":"beautiful"},{"word":"white","pos":"adj","definition":"Bright and colourless; reflecting equal quantities of all frequencies of visible light.","topic":"beautiful"},{"word":"fruitful","pos":"adj","definition":"Being productive in any sense; yielding benefits.","topic":"interesting"},{"word":"golden","pos":"adj","definition":"Made of, or relating to, gold.","topic":"beautiful"},{"word":"sweet","pos":"adj","definition":"Tasting of sugars.","topic":"beautiful"},{"word":"gravy","pos":"n","definition":"(countable, uncountable) A thick sauce made from the fat or juices that come out from meat or vegetables as they are being cooked.","topic":"beautiful"},{"word":"honey","pos":"adj","definition":"Of a pale yellow to brownish-yellow color, like most types of honey.","topic":"beautiful"},{"word":"kaohsiung","pos":"n","definition":"A city and special municipality in southern Taiwan, and the third largest city in Taiwan.","topic":"beautiful"},{"word":"jolie","pos":"n","definition":"A female given name from French.","topic":"beautiful"},{"word":"jamila","pos":"n","definition":"A female given name from Arabic.","topic":"beautiful"},{"word":"bella","pos":"n","definition":"A female given name from Italian.","topic":"beautiful"},{"word":"linda","pos":"n","definition":"A female given name from the Germanic languages.","topic":"beautiful"},{"word":"missy","pos":"adj","definition":"Girlish; effeminate; sentimental.","topic":"beautiful"},{"word":"jamil","pos":"n","definition":"A male given name from Arabic.","topic":"beautiful"},{"word":"involving","pos":"v","definition":"To cause or engage (someone or something) to become connected or implicated, or to participate, in some activity or situation.","topic":"interesting"},{"word":"captivating","pos":"adj","definition":"That captivates; fascinating.","topic":"interesting"},{"word":"alluring","pos":"adj","definition":"Having the power to allure.","topic":"interesting"},{"word":"enthralling","pos":"adj","definition":"exciting and absorbing","topic":"interesting"},{"word":"spellbinding","pos":"adj","definition":"Engrossing; fascinating; gaining rapt attention; captivating.","topic":"interesting"},{"word":"arresting","pos":"adj","definition":"striking, gripping","topic":"interesting"},{"word":"unusual","pos":"adj","definition":"Not usual, out of the ordinary.","topic":"interesting"},{"word":"troubling","pos":"adj","definition":"distressing, worrying","topic":"interesting"},{"word":"puzzling","pos":"adj","definition":"Difficult to understand or explain; enigmatic or confusing; perplexing.","topic":"interesting"},{"word":"interestingly","pos":"adv","definition":"In an interesting way.","topic":"interesting"},{"word":"disturbing","pos":"adj","definition":"Causing distress or worry; upsetting or unsettling.","topic":"interesting"},{"word":"fascinatingly","pos":"adv","definition":"In a fascinating manner","topic":"interesting"},{"word":"unsurprising","pos":"adj","definition":"Not surprising; expected.","topic":"interesting"},{"word":"quirky","pos":"adj","definition":"Given to quirks or idiosyncrasies; strange in a somewhat silly, awkward manner, potentially cute.","topic":"interesting"},{"word":"weird","pos":"adj","definition":"Having an unusually strange character or behaviour.","topic":"interesting"},{"word":"eyeopening","pos":"adj","definition":"Alternative spelling of eye-opening. [Very startling or shocking; engaging a person's full attention.]","topic":"interesting"},{"word":"unsettling","pos":"adj","definition":"That makes one troubled or uneasy; disquieting or distressing.","topic":"interesting"},{"word":"unique","pos":"adj","definition":"(not comparable) Being the only one of its kind; unequaled, unparalleled or unmatched.","topic":"interesting"},{"word":"saddening","pos":"adj","definition":"Causing feelings of sadness.","topic":"interesting"},{"word":"perplexing","pos":"adj","definition":"That causes perplexity.","topic":"interesting"},{"word":"startling","pos":"adj","definition":"Likely to startle; surprising; shocking.","topic":"interesting"},{"word":"thrilling","pos":"adj","definition":"Causing a feeling of sudden excitement.","topic":"interesting"},{"word":"shocking","pos":"adj","definition":"Inspiring shock; startling.","topic":"interesting"},{"word":"provocative","pos":"adj","definition":"Serving or tending to elicit a strong, often negative sentiment in another person; exasperating.","topic":"interesting"},{"word":"intriguingly","pos":"adv","definition":"In an intriguing manner; with intrigue; with artifice or secret machinations.","topic":"interesting"},{"word":"varied","pos":"adj","definition":"diverse or miscellaneous","topic":"interesting"},{"word":"uninteresting","pos":"adj","definition":"Arousing little or no interest; boring or uneventful.","topic":"interesting"},{"word":"amazing","pos":"adj","definition":"Causing wonder and amazement; very surprising.","topic":"interesting"},{"word":"delightful","pos":"adj","definition":"Pleasant; pleasing, bringing enjoyment, satisfaction, or pleasure.","topic":"interesting"},{"word":"ironic","pos":"adj","definition":"(of a situation) Characterized by or constituting (any kind of) irony.","topic":"interesting"},{"word":"humorous","pos":"adj","definition":"Full of humor or arousing laughter; funny.","topic":"interesting"},{"word":"hilarious","pos":"adj","definition":"Very funny; causing great merriment and laughter.","topic":"interesting"},{"word":"different","pos":"adj","definition":"Not the same; exhibiting a difference.","topic":"interesting"},{"word":"plausible","pos":"adj","definition":"Seemingly or apparently valid, likely, or acceptable; conceivably true or likely.","topic":"interesting"},{"word":"frightening","pos":"adj","definition":"Causing fear; or capable of causing fear; scary.","topic":"interesting"},{"word":"peculiar","pos":"adj","definition":"Out of the ordinary; odd; strange; unusual.","topic":"interesting"},{"word":"surprisingly","pos":"adv","definition":"In a way that causes surprise because it is unexpected, or unusual.","topic":"interesting"},{"word":"baffling","pos":"adj","definition":"Puzzling, perplexing, bewildering.","topic":"interesting"},{"word":"dismaying","pos":"adj","definition":"Disheartening; daunting.","topic":"interesting"},{"word":"disconcerting","pos":"adj","definition":"Tending to cause discomfort, uneasiness or alarm.","topic":"interesting"},{"word":"affectated","pos":"adj","definition":"(obsolete) affected","topic":"interesting"},{"word":"innerestin","pos":"adj","definition":"Pronunciation spelling of interesting. [(obsolete) Of concern; affecting, important.]","topic":"interesting"},{"word":"respective","pos":"adj","definition":"Relating to particular persons or things, each to each; particular; own.","topic":"interesting"},{"word":"historick","pos":"adj","definition":"Obsolete form of historic. [Very important; noteworthy: having importance or significance in history.]","topic":"interesting"},{"word":"momental","pos":"adj","definition":"(obsolete) Lasting only for a moment; brief.","topic":"interesting"},{"word":"careful","pos":"adj","definition":"Taking care; attentive to potential danger, error or harm; cautious.","topic":"interesting"},{"word":"hystoric","pos":"adj","definition":"(obsolete) Nonstandard spelling of historic. [Very important; noteworthy: having importance or significance in history.]","topic":"interesting"},{"word":"annoyous","pos":"adj","definition":"(obsolete) troublesome; annoying","topic":"interesting"},{"word":"germain","pos":"n","definition":"A male given name from French.","topic":"interesting"},{"word":"markable","pos":"adj","definition":"Capable of being marked.","topic":"interesting"},{"word":"unsignificant","pos":"adj","definition":"Obsolete form of insignificant. [Not significant; not important, inconsequential, or having no noticeable effect.]","topic":"interesting"},{"word":"encumbrous","pos":"adj","definition":"(obsolete) Of, pertaining to, or causing an encumbrance; cumbersome; troublesome.","topic":"interesting"},{"word":"astonishable","pos":"adj","definition":"Susceptible to being astonished; shockable.","topic":"interesting"},{"word":"grave","pos":"n","definition":"(strictly) An excavation in the earth as a place of burial.","topic":"interesting"},{"word":"intricable","pos":"adj","definition":"(obsolete) Intricate, entangled.","topic":"interesting"},{"word":"affectious","pos":"adj","definition":"(obsolete) affectionate","topic":"interesting"},{"word":"controversary","pos":"adj","definition":"(obsolete) controversial","topic":"interesting"},{"word":"undispensable","pos":"adj","definition":"(obsolete) Indispensable.","topic":"interesting"},{"word":"adviceful","pos":"adj","definition":"Providing advice; informative, insightful.","topic":"interesting"},{"word":"obsolete","pos":"adj","definition":"(of words, equipment, etc.) No longer in use; gone into disuse; disused or neglected (often in favour of something newer).","topic":"interesting"},{"word":"extant","pos":"adj","definition":"Still in existence; not having disappeared.","topic":"interesting"},{"word":"pressive","pos":"adj","definition":"(obsolete) pressing; urgent","topic":"interesting"},{"word":"deadly","pos":"adj","definition":"Causing death; lethal.","topic":"interesting"},{"word":"desiderable","pos":"adj","definition":"(obsolete) Desirable.","topic":"interesting"},{"word":"annoyful","pos":"adj","definition":"(obsolete) annoying","topic":"interesting"},{"word":"certain","pos":"adj","definition":"Sure in one's mind, positive; absolutely confident in the truth of something.","topic":"interesting"},{"word":"ancient","pos":"n","definition":"A person who lived in ancient times.","topic":"interesting"},{"word":"concludent","pos":"adj","definition":"(obsolete) Conclusive; decisive.","topic":"interesting"},{"word":"majour","pos":"n","definition":"Obsolete form of major. [(military) A rank of officer in the army and the US air force, between captain and lieutenant colonel.]","topic":"interesting"},{"word":"mindful","pos":"adj","definition":"aware (of something); attentive, heedful.","topic":"interesting"},{"word":"outdated","pos":"adj","definition":"Out of date; not the latest; obsolete.","topic":"interesting"},{"word":"wondered","pos":"adj","definition":"(obsolete) Wonderful, extraordinary.","topic":"interesting"},{"word":"elderly","pos":"adj","definition":"old; having lived for relatively many years.","topic":"interesting"},{"word":"incumbrous","pos":"adj","definition":"(obsolete) cumbersome; troublesome","topic":"interesting"},{"word":"ententive","pos":"adj","definition":"Obsolete form of intentive. [Paying attention; attentive, heedful.]","topic":"interesting"},{"word":"quaint","pos":"adj","definition":"Pleasingly unusual; especially, having old-fashioned charm.","topic":"interesting"},{"word":"allarming","pos":"adj","definition":"Obsolete spelling of alarming. [Causing apprehension, fear or alarm; frightening.]","topic":"interesting"},{"word":"distroubled","pos":"adj","definition":"(obsolete) Troubled, disturbed.","topic":"interesting"},{"word":"heedy","pos":"adj","definition":"(obsolete) Heedful; attentive.","topic":"interesting"},{"word":"sensive","pos":"adj","definition":"(obsolete) Having sense or sensibility; sensitive or sensory.","topic":"interesting"},{"word":"dramatick","pos":"adj","definition":"Obsolete form of dramatic. [Of or relating to the drama.]","topic":"interesting"},{"word":"exempt","pos":"adj","definition":"Free from a duty, obligation, rule, law, etc.","topic":"interesting"},{"word":"unvariable","pos":"adj","definition":"(obsolete) Invariable.","topic":"interesting"},{"word":"attent","pos":"n","definition":"(obsolete) Attention.","topic":"interesting"},{"word":"concluding","pos":"adj","definition":"Finishing; closing; final.","topic":"interesting"},{"word":"obtected","pos":"adj","definition":"(zoology) Covered with a hard chitinous case, like the pupa of certain files.","topic":"interesting"},{"word":"innuent","pos":"adj","definition":"(obsolete) Conveying a hint; significant.","topic":"interesting"},{"word":"exotick","pos":"n","definition":"Obsolete form of exotic. [(biology) An organism that is exotic to an environment.]","topic":"interesting"},{"word":"abstract","pos":"n","definition":"An abridgement or summary of a longer publication.","topic":"interesting"},{"word":"especiall","pos":"adj","definition":"Obsolete form of especial. [Exceptional in importance or significance; special.]","topic":"interesting"},{"word":"ostentous","pos":"adj","definition":"(obsolete) ostentatious","topic":"interesting"},{"word":"tragedious","pos":"adj","definition":"(obsolete) Being or causing a tragedy; tragic.","topic":"interesting"},{"word":"pesterous","pos":"adj","definition":"(obsolete) Inclined to pester; vexatious; burdensome.","topic":"interesting"},{"word":"absentaneous","pos":"adj","definition":"(rare) Pertaining to absence.","topic":"interesting"},{"word":"burdenous","pos":"adj","definition":"(obsolete) Heavy; oppressive.","topic":"interesting"},{"word":"scorny","pos":"adj","definition":"(obsolete) Expressing scorn; scornful, contemptuous.","topic":"interesting"},{"word":"erotical","pos":"adj","definition":"(obsolete) Erotic.","topic":"interesting"},{"word":"scientifick","pos":"adj","definition":"Obsolete form of scientific. [Related or connected to science:]","topic":"interesting"},{"word":"pensative","pos":"adj","definition":"(obsolete) pensive","topic":"interesting"},{"word":"theorical","pos":"adj","definition":"(obsolete) theoretical","topic":"interesting"},{"word":"powreful","pos":"adj","definition":"Obsolete form of powerful. [Having, or capable of exerting, power or influence.]","topic":"interesting"},{"word":"bethreatened","pos":"adj","definition":"(obsolete, rare) Threatened by mortal danger.","topic":"interesting"},{"word":"contiguate","pos":"adj","definition":"(obsolete) Contiguous, touching.","topic":"interesting"},{"word":"agazed","pos":"adj","definition":"(obsolete) Gazing with astonishment; amazed.","topic":"interesting"},{"word":"obversant","pos":"adj","definition":"(obsolete) conversant; familiar or in the know about a certain topic.","topic":"interesting"},{"word":"incertain","pos":"adj","definition":"(obsolete) Not certain, uncertain.","topic":"interesting"},{"word":"beloving","pos":"adj","definition":"(obsolete) Loving.","topic":"interesting"},{"word":"valueable","pos":"adj","definition":"Misspelling of valuable. [Having a great value.]","topic":"interesting"},{"word":"augurous","pos":"adj","definition":"(uncommon) Full of augury; foreboding.","topic":"interesting"},{"word":"wondreful","pos":"adj","definition":"Obsolete form of wonderful. [Tending to excite wonder; surprising, extraordinary.]","topic":"interesting"},{"word":"historial","pos":"n","definition":"(archaic or historical) Synonym of history or record.","topic":"interesting"},{"word":"inventious","pos":"adj","definition":"(obsolete) inventive","topic":"interesting"},{"word":"toward","pos":"adj","definition":"(dated) Approaching, coming near; impending; present, at hand.","topic":"interesting"},{"word":"aunchient","pos":"adj","definition":"Obsolete form of ancient. [Having lasted from a remote period; having been of long duration; of great age, very old.]","topic":"interesting"},{"word":"preventive","pos":"adj","definition":"Preventing, hindering, or acting as an obstacle to.","topic":"interesting"},{"word":"covetious","pos":"adj","definition":"(obsolete, proscribed) Covetous.","topic":"interesting"},{"word":"emphatick","pos":"adj","definition":"Obsolete form of emphatic. [Characterized by emphasis; forceful.]","topic":"interesting"},{"word":"problematick","pos":"adj","definition":"Obsolete form of problematic. [Posing a problem; having or suffering from problem(s):]","topic":"interesting"},{"word":"usefull","pos":"adj","definition":"Obsolete form of useful. [Having a practical or beneficial use.]","topic":"interesting"},{"word":"maine","pos":"n","definition":"A state of the United States; probably named for the province in France. Capital: Augusta. Largest city: Portland.","topic":"interesting"},{"word":"anctious","pos":"adj","definition":"Obsolete form of anxious. [Nervous and worried.]","topic":"interesting"},{"word":"essentiall","pos":"adj","definition":"Obsolete form of essential. [Necessary.]","topic":"interesting"},{"word":"threatning","pos":"n","definition":"Obsolete form of threatening. [An act of threatening; a threat.]","topic":"interesting"},{"word":"politicall","pos":"adj","definition":"Obsolete form of political. [Concerning or relating to politics, the art and process of governing.]","topic":"interesting"},{"word":"stupendious","pos":"adj","definition":"(obsolete) Stupendous.","topic":"interesting"},{"word":"abrupt","pos":"adj","definition":"Without notice to prepare the mind for the event; sudden; hasty; unceremonious.","topic":"interesting"},{"word":"sympathetick","pos":"adj","definition":"Obsolete form of sympathetic. [Of, related to, feeling, showing, or characterized by sympathy.]","topic":"interesting"},{"word":"prognostick","pos":"n","definition":"Obsolete spelling of prognostic (noun). [(rare, medicine) prognosis]","topic":"interesting"},{"word":"exoteric","pos":"adj","definition":"Of a doctrine, information, etc.: suitable to be imparted to the public without secrecy or other reservations.","topic":"interesting"},{"word":"readable","pos":"adj","definition":"(of handwriting, print, etc) Legible, possible to read or at least decipher.","topic":"interesting"},{"word":"beaux","pos":"n","definition":"(dated, US, Canada) A male lover; a boyfriend.","topic":"beautiful"},{"word":"hermosa","pos":"n","definition":"A municipality in Bataan province, Philippines.","topic":"beautiful"},{"word":"prettier","pos":"adj","definition":"Pleasant to the sight or other senses; attractive, especially of women or children.","topic":"beautiful"},{"word":"fetching","pos":"adj","definition":"Attractive; pleasant to regard.","topic":"beautiful"},{"word":"beautifull","pos":"adj","definition":"Obsolete spelling of beautiful. [Possessing beauty, impressing the eye; attractive.]","topic":"beautiful"},{"word":"luscious","pos":"adj","definition":"Sweet and pleasant; delicious.","topic":"beautiful"},{"word":"magnificient","pos":"adj","definition":"Misspelling of magnificent. [Grand, elegant or splendid in appearance.]","topic":"beautiful"},{"word":"stunningly","pos":"adv","definition":"So as to stun or amaze.","topic":"beautiful"},{"word":"beautyful","pos":"adj","definition":"Misspelling of beautiful. [Possessing beauty, impressing the eye; attractive.]","topic":"beautiful"},{"word":"magnificant","pos":"adj","definition":"Misspelling of magnificent. [Grand, elegant or splendid in appearance.]","topic":"beautiful"},{"word":"gorgeously","pos":"adv","definition":"In a gorgeous manner.","topic":"beautiful"},{"word":"mesmerizing","pos":"adj","definition":"Exercising mesmerism on; spellbinding; enthralling.","topic":"beautiful"},{"word":"amazingly","pos":"adv","definition":"In an amazing manner; in a way that causes amazement; wonderfully.","topic":"beautiful"},{"word":"luxurious","pos":"adj","definition":"Very fine in quality and comfortable.","topic":"beautiful"},{"word":"loveliest","pos":"adj","definition":"Delightful for beauty, harmony, or grace.","topic":"beautiful"},{"word":"vibrant","pos":"adj","definition":"Pulsing with energy or activity.","topic":"beautiful"},{"word":"serene","pos":"adj","definition":"Calm, peaceful, unruffled.","topic":"beautiful"},{"word":"tranquil","pos":"adj","definition":"Calm; without motion or sound.","topic":"beautiful"},{"word":"scrumptious","pos":"adj","definition":"Of food: delectable, delicious.","topic":"beautiful"},{"word":"fabulously","pos":"adv","definition":"In a fabulous manner.","topic":"beautiful"},{"word":"evocative","pos":"adj","definition":"That evokes (brings to mind) a memory, mood, idea, feeling, or image; redolent or reminiscent.","topic":"beautiful"},{"word":"seductive","pos":"adj","definition":"Attractive, alluring, tempting.","topic":"beautiful"},{"word":"beautifool","pos":"adj","definition":"Pronunciation spelling of beautiful. [Possessing beauty, impressing the eye; attractive.]","topic":"beautiful"},{"word":"beautisome","pos":"adj","definition":"Characterised or marked by beauty","topic":"beautiful"},{"word":"lookful","pos":"adj","definition":"Attractive; nice to look at.","topic":"beautiful"},{"word":"flattering","pos":"adj","definition":"Gratifying to one's self-esteem; complimentary.","topic":"beautiful"},{"word":"bootiful","pos":"adj","definition":"Pronunciation spelling of beautiful, representing East Anglia English. [Possessing beauty, impressing the eye; attractive.]","topic":"beautiful"},{"word":"artistic","pos":"adj","definition":"Relating to or characteristic of art or artists.","topic":"beautiful"},{"word":"taking","pos":"n","definition":"The act by which something is taken.","topic":"beautiful"},{"word":"shapely","pos":"adj","definition":"Having a pleasing shape, pleasant to look at.","topic":"beautiful"},{"word":"lovesome","pos":"adj","definition":"Worthy of love; having qualities that inspire love; lovable.","topic":"beautiful"},{"word":"beautifying","pos":"adj","definition":"That beautifies; tending to make beautiful.","topic":"beautiful"},{"word":"charmful","pos":"adj","definition":"(archaic, chiefly poetic) Abounding with charms; charming.","topic":"beautiful"},{"word":"inviting","pos":"adj","definition":"Alluring; tempting; attractive.","topic":"beautiful"},{"word":"tempting","pos":"adj","definition":"Attractive, appealing, enticing.","topic":"beautiful"},{"word":"bewitchful","pos":"adj","definition":"Bewitching; alluring; fascinating; amazing.","topic":"beautiful"},{"word":"smicker","pos":"v","definition":"(intransitive, chiefly Scotland) To look or smile seductively or amorously.","topic":"beautiful"},{"word":"beaut","pos":"n","definition":"(informal) Something or someone that is physically attractive.","topic":"beautiful"},{"word":"swish","pos":"n","definition":"A short rustling, hissing or whistling sound, often made by friction.","topic":"beautiful"},{"word":"beautimous","pos":"adj","definition":"(Southern US, colloquial, sometimes humorous) Beautiful.","topic":"beautiful"},{"word":"prettysome","pos":"adj","definition":"Characterised or marked by prettiness","topic":"beautiful"},{"word":"sculptured","pos":"adj","definition":"Made like a sculpture.","topic":"beautiful"},{"word":"suave","pos":"adj","definition":"Of a person, charming, though often in a manner that is insincere or sophisticated.","topic":"beautiful"},{"word":"smoky","pos":"adj","definition":"Filled with smoke.","topic":"beautiful"},{"word":"cheerful","pos":"adj","definition":"Noticeably happy and optimistic.","topic":"beautiful"},{"word":"beautied","pos":"adj","definition":"(obsolete, poetic) beautiful; embellished","topic":"beautiful"},{"word":"beauish","pos":"adj","definition":"Like a beau; characteristic of a beau","topic":"beautiful"},{"word":"fairsome","pos":"adj","definition":"Characterised by fairness or beauty; characteristically fair; attractive","topic":"beautiful"},{"word":"silky","pos":"adj","definition":"Similar in appearance or texture (especially in softness and smoothness) to silk.","topic":"beautiful"},{"word":"goluptious","pos":"adj","definition":"splendid, delightful, magnificent","topic":"beautiful"},{"word":"savory","pos":"n","definition":"(American spelling) A savory snack.","topic":"beautiful"},{"word":"featurely","pos":"adj","definition":"(archaic) Having particular features; marked with peculiarities or with good looks.","topic":"beautiful"},{"word":"cosmetic","pos":"adj","definition":"Imparting or improving beauty, particularly the beauty of the complexion.","topic":"beautiful"},{"word":"eyesome","pos":"adj","definition":"(archaic, often poetic) Visually attractive.","topic":"beautiful"},{"word":"splendorous","pos":"adj","definition":"Splendid, having splendor.","topic":"beautiful"},{"word":"specious","pos":"adj","definition":"Seemingly well-reasoned, plausible or true, but actually fallacious.","topic":"beautiful"},{"word":"sheen","pos":"n","definition":"(also figuratively) Splendor; radiance; shininess.","topic":"beautiful"},{"word":"knockout","pos":"n","definition":"The act of making one unconscious, or at least unable to come back on one's feet within a certain period of time; a TKO.","topic":"beautiful"},{"word":"opulent","pos":"adj","definition":"Rich, sumptuous and extravagant.","topic":"beautiful"},{"word":"figuresome","pos":"adj","definition":"Possessing an attractive figure or shape.","topic":"beautiful"},{"word":"glittering","pos":"adj","definition":"Brightly sparkling.","topic":"beautiful"},{"word":"eyeful","pos":"n","definition":"A full or complete view; a good look.","topic":"beautiful"},{"word":"venuslike","pos":"adj","definition":"Resembling or characteristic of Venus (the goddess); beautiful and voluptuous.","topic":"beautiful"},{"word":"delicate","pos":"adj","definition":"Easily damaged or requiring careful handling.","topic":"beautiful"},{"word":"lusty","pos":"adj","definition":"Exhibiting lust (in the obsolete sense meaning \"vigor\"); strong, healthy, robust; vigorous; full of sap or vitality.","topic":"beautiful"},{"word":"debonair","pos":"adj","definition":"(especially of men) Charming, confident, and carefully dressed.","topic":"beautiful"},{"word":"blandsome","pos":"adj","definition":"Good-looking, yet also boring and average.","topic":"beautiful"},{"word":"dashing","pos":"adj","definition":"Spirited, audacious and full of high spirits.","topic":"beautiful"},{"word":"galluptious","pos":"adj","definition":"wonderful; fascinating; delightful","topic":"beautiful"},{"word":"gleaming","pos":"adj","definition":"Having a bright sheen.","topic":"beautiful"},{"word":"formous","pos":"adj","definition":"(rare) fair; beautiful.","topic":"beautiful"},{"word":"adornment","pos":"n","definition":"A decoration; that which adorns.","topic":"interesting"},{"word":"apathy","pos":"n","definition":"Lack of emotion or motivation; lack of interest or enthusiasm towards something; disinterest (in something).","topic":"interesting"},{"word":"appeal","pos":"n","definition":"A call to a person or an authority for a decision, help, or proof; an entreaty, an invocation.","topic":"interesting"},{"word":"awesome","pos":"adj","definition":"(colloquial, Canada, US, Australia) Excellent, exciting, remarkable.","topic":"interesting"},{"word":"better","pos":"adj","definition":"Greater or lesser (whichever is seen as more advantageous), in reference to value, distance, time, etc.","topic":"interesting"},{"word":"challenge","pos":"n","definition":"A confrontation; a dare.","topic":"interesting"},{"word":"colorful","pos":"adj","definition":"Possessing prominent and varied colors.","topic":"interesting"},{"word":"colourful","pos":"adj","definition":"British standard spelling of colorful.","topic":"interesting"},{"word":"drama","pos":"n","definition":"(uncountable) Theatrical plays in general.","topic":"interesting"},{"word":"engage","pos":"v","definition":"(transitive) To engross or hold the attention of; to keep busy or occupied.","topic":"interesting"},{"word":"evergreen","pos":"adj","definition":"Of plants, especially trees, that do not shed their leaves seasonally.","topic":"interesting"},{"word":"fascination","pos":"n","definition":"The state or condition of being fascinated.","topic":"interesting"},{"word":"ground","pos":"n","definition":"The surface of the Earth, as opposed to the sky or water or underground.","topic":"interesting"},{"word":"highlight","pos":"v","definition":"(transitive) To make prominent; emphasize.","topic":"interesting"},{"word":"insipid","pos":"adj","definition":"Flat; lacking character or definition.","topic":"interesting"},{"word":"jejune","pos":"adj","definition":"(by extension, of a speech or an argument) Lacking matter; empty; devoid of substance.","topic":"interesting"},{"word":"newsy","pos":"adj","definition":"Containing lots of news; informative.","topic":"interesting"},{"word":"relic","pos":"n","definition":"That which remains; that which is left after loss or decay; a remaining portion.","topic":"interesting"},{"word":"rested","pos":"adj","definition":"(usually with \"well\") recovered","topic":"interesting"},{"word":"sauce","pos":"n","definition":"A liquid (often thickened) condiment or accompaniment to food.","topic":"interesting"},{"word":"sightsee","pos":"v","definition":"(intransitive) To go sightseeing; to visit places of interest in a city, town or geographical area.","topic":"interesting"},{"word":"sightseeing","pos":"n","definition":"The activity of going out looking at things; tourism.","topic":"interesting"},{"word":"significance","pos":"n","definition":"The extent to which something matters; importance","topic":"interesting"},{"word":"spice","pos":"n","definition":"(countable, uncountable) Aromatic or pungent plant matter (usually dried) used to season or flavor food.","topic":"interesting"},{"word":"stale","pos":"adj","definition":"No longer fresh, in reference to food, urine, straw, wounds, etc.","topic":"interesting"},{"word":"underwhelming","pos":"adj","definition":"Failing to interest; not as exciting as promised or expected.","topic":"interesting"},{"word":"vapid","pos":"adj","definition":"Offering nothing that is stimulating or challenging.","topic":"interesting"},{"word":"action","pos":"n","definition":"The effort of performing or doing something.","topic":"interesting"},{"word":"almanac","pos":"n","definition":"A handbook, typically published annually, containing information on a particular subject.","topic":"interesting"},{"word":"ammonia","pos":"n","definition":"A solution of this compound in water used domestically as a cleaning fluid.","topic":"interesting"},{"word":"anecdote","pos":"n","definition":"A short account of a real incident or person, often humorous or interesting.","topic":"interesting"},{"word":"banal","pos":"adj","definition":"Common in a boring way, to the point of being predictable; containing nothing new or fresh.","topic":"interesting"},{"word":"blandness","pos":"n","definition":"Lack of taste or flavor.","topic":"interesting"},{"word":"brisk","pos":"adj","definition":"Full of liveliness and activity; characterized by quickness of motion or action.","topic":"interesting"},{"word":"cunning","pos":"adj","definition":"Sly; crafty; clever in surreptitious behaviour.","topic":"interesting"},{"word":"curio","pos":"n","definition":"A strange and interesting object; something that evokes curiosity.","topic":"interesting"},{"word":"decorate","pos":"v","definition":"(ambitransitive) To improve the appearance of an interior of, as a house, room, or office.","topic":"interesting"},{"word":"divertive","pos":"adj","definition":"(archaic) fun; amusing; interesting.","topic":"interesting"},{"word":"drier","pos":"n","definition":"A surname from German.","topic":"interesting"},{"word":"dullest","pos":"adj","definition":"Boring; not exciting or interesting.","topic":"interesting"},{"word":"embellish","pos":"v","definition":"To make more beautiful and attractive by adding ornamentation; to decorate.","topic":"interesting"},{"word":"embroider","pos":"v","definition":"To stitch a decorative design on fabric with needle and thread of various colours.","topic":"interesting"},{"word":"enliven","pos":"v","definition":"(transitive) To make more lively, cheerful or interesting.","topic":"interesting"},{"word":"enlivened","pos":"adj","definition":"made lively or spirited","topic":"interesting"},{"word":"enlivening","pos":"n","definition":"The process of making something more lively.","topic":"interesting"},{"word":"enrich","pos":"v","definition":"(transitive) To make (someone or something) rich or richer. [from 14th c.]","topic":"interesting"},{"word":"entry","pos":"n","definition":"An item in a list, such as an article in a dictionary or encyclopedia.","topic":"interesting"},{"word":"exhilarating","pos":"adj","definition":"Refreshingly thrilling.","topic":"interesting"},{"word":"factoid","pos":"n","definition":"An inaccurate statement or statistic believed to be true because of broad repetition, especially if cited in the media.","topic":"interesting"},{"word":"fairytale","pos":"n","definition":"Alternative spelling of fairy tale. [A folktale or literary story featuring fairies or similar fantasy characters.]","topic":"interesting"},{"word":"featureless","pos":"adj","definition":"Without distinguishing features.","topic":"interesting"},{"word":"filmic","pos":"adj","definition":"(literature) Of or relating to movies; cinematic.","topic":"interesting"},{"word":"fruity","pos":"adj","definition":"Containing fruit or fruit flavoring.","topic":"interesting"},{"word":"gadget","pos":"n","definition":"Any device or machine, especially one whose name cannot be recalled, often either clever or complicated.","topic":"interesting"},{"word":"grounded","pos":"adj","definition":"(of a person) With well-considered priorities through a good understanding of what truly matters.","topic":"interesting"},{"word":"hacking","pos":"n","definition":"(computing) Playful solving of technical work that requires deep understanding, especially of a computer system.","topic":"interesting"},{"word":"happening","pos":"n","definition":"Something that happens.","topic":"interesting"},{"word":"highlighting","pos":"n","definition":"The visual emphasis of text by means of a highlight.","topic":"interesting"},{"word":"history","pos":"n","definition":"The aggregate of past events.","topic":"interesting"},{"word":"immense","pos":"adj","definition":"Huge, gigantic, very large.","topic":"interesting"},{"word":"insipidity","pos":"n","definition":"(uncountable) The condition of being insipid; insipidness.","topic":"interesting"},{"word":"insipidness","pos":"n","definition":"A lack of distinctive, appealing, or energetic character; tastelessness; extreme blandness.","topic":"interesting"},{"word":"liven","pos":"v","definition":"(ambitransitive) To cause to be more lively, or to become more lively.","topic":"interesting"},{"word":"nondescript","pos":"adj","definition":"Without distinguishing qualities or characteristics.","topic":"interesting"},{"word":"nonuniformity","pos":"n","definition":"(uncountable) The condition of being nonuniform","topic":"interesting"},{"word":"novel","pos":"n","definition":"A work of prose fiction, longer than a novella.","topic":"interesting"},{"word":"novelty","pos":"n","definition":"The state of being new or novel; newness.","topic":"interesting"},{"word":"original","pos":"adj","definition":"(not comparable) Newly created.","topic":"interesting"},{"word":"payoff","pos":"n","definition":"Alternative form of pay-off. [A payment in full; the state of having been paid in full.]","topic":"interesting"},{"word":"pepper","pos":"n","definition":"(uncountable) A spice prepared from the fermented, dried, unripe berries of this plant.","topic":"interesting"},{"word":"picturesque","pos":"adj","definition":"Resembling or worthy of a picture or painting; having the qualities of a picture or painting; pleasingly beautiful.","topic":"interesting"},{"word":"piquant","pos":"adj","definition":"Favorably stimulating to the palate; pleasantly spicy; tangy.","topic":"interesting"},{"word":"poitiers","pos":"n","definition":"A city, the capital of Vienne department, Nouvelle-Aquitaine region, France.","topic":"interesting"},{"word":"pompous","pos":"adj","definition":"Affectedly grand, solemn or self-important.","topic":"interesting"},{"word":"popularize","pos":"v","definition":"American and Oxford British spelling of popularise","topic":"interesting"},{"word":"possibility","pos":"n","definition":"A thing possible; that which may take place or come into being.","topic":"interesting"},{"word":"pretty","pos":"adj","definition":"Pleasant to the sight or other senses; attractive, especially of women or children.","topic":"interesting"},{"word":"promised","pos":"adj","definition":"Under obligation to some future commitment, such as a marriage or vocation.","topic":"interesting"},{"word":"rarefied","pos":"adj","definition":"Distant from the lives and everyday concerns of ordinary people; esoteric, exclusive, select.","topic":"interesting"},{"word":"rarity","pos":"n","definition":"A measure of the scarcity of an object.","topic":"interesting"},{"word":"sapid","pos":"adj","definition":"tasty, flavoursome","topic":"interesting"},{"word":"speak","pos":"v","definition":"(intransitive) To communicate with one's voice, to say words out loud.","topic":"interesting"},{"word":"spectacle","pos":"n","definition":"An exciting or extraordinary scene, exhibition, performance etc.","topic":"interesting"},{"word":"steal","pos":"v","definition":"(transitive) To take illegally, or without the owner's permission, something owned by someone else without intending to return it.","topic":"interesting"},{"word":"storied","pos":"adj","definition":"Much discussed or written about.","topic":"interesting"},{"word":"subject","pos":"n","definition":"The main topic of a paper, work of art, discussion, field of study, etc.","topic":"interesting"},{"word":"super","pos":"adj","definition":"Better than average, better than usual; wonderful.","topic":"interesting"},{"word":"tamed","pos":"adj","definition":"domesticated; made tame","topic":"interesting"},{"word":"tasty","pos":"adj","definition":"Having a pleasant or satisfying flavor.","topic":"interesting"},{"word":"terrific","pos":"adj","definition":"Extremely good; excellent, amazing.","topic":"interesting"},{"word":"transport","pos":"v","definition":"To carry or bear from one place to another; to remove; to convey.","topic":"interesting"},{"word":"uneventful","pos":"adj","definition":"monotonous; lacking significant or noteworthy events","topic":"interesting"},{"word":"uninformative","pos":"adj","definition":"lacking useful or interesting information","topic":"interesting"},{"word":"unreadable","pos":"adj","definition":"Not written clearly enough to be deciphered.","topic":"interesting"},{"word":"abandon","pos":"v","definition":"(transitive) To give up or relinquish control of, to surrender or to give oneself over, or to yield to one's emotions.","topic":"interesting"},{"word":"abandoning","pos":"n","definition":"An act in which something or someone is abandoned; abandonment, neglect","topic":"interesting"},{"word":"abnegation","pos":"n","definition":"A denial; a renunciation; denial of desire or self-interest.","topic":"interesting"},{"word":"absorbed","pos":"adj","definition":"Fully occupied with one's thoughts; engrossed.","topic":"interesting"},{"word":"abydos","pos":"n","definition":"An ancient city in Egypt with archaeological interest.","topic":"interesting"},{"word":"academic","pos":"adj","definition":"Belonging to an academy or other higher institution of learning, or a scholarly society or organization.","topic":"interesting"},{"word":"accommodate","pos":"v","definition":"(transitive) To provide housing for.","topic":"interesting"},{"word":"accrual","pos":"n","definition":"The act or process of accruing; accumulation.","topic":"interesting"},{"word":"monotonous","pos":"adj","definition":"Tedious, repetitious, or lacking in variety.","topic":"interesting"},{"word":"boring","pos":"adj","definition":"Causing boredom or tiredness; making one feel tired and impatient.","topic":"interesting"}];

const featuredEtymologyPaths = {
  Apricity: "Latin - apricitas, warmth of the sun - apricus, sunny or sunlit - English apricity.",
  Petrichor: "Greek - petra, stone - Greek ichor, mythical divine fluid - modern English petrichor, coined in the 1960s.",
  Susurrus: "Latin - susurrus, whispering or murmuring - English susurrus.",
  Sonder: "Modern coinage - The Dictionary of Obscure Sorrows - English sonder.",
  Liminal: "Latin - limen, threshold - Latin liminalis, belonging to a threshold - English liminal.",
  Eldritch: "Scots and Middle English - words linked with strangeness or the otherworldly - English eldritch.",
  Ineffable: "Latin - in, not - Latin effabilis, speakable - French ineffable - English ineffable.",
  Numinous: "Latin - numen, divine presence or will - English numinous.",
  Palimpsest: "Greek - palin, again - Greek psestos, scraped - Latin palimpsestus - English palimpsest.",
  Halcyon: "Greek - alkyon, kingfisher of myth - Latin halcyon - English halcyon.",
  Verdant: "Latin - viridis, green - Old French verdoyant - English verdant.",
  Mellifluous: "Latin - mel, honey - Latin fluere, to flow - English mellifluous.",
  Quiddity: "Latin - quid, what - Medieval Latin quidditas, whatness - English quiddity.",
  Lacuna: "Latin - lacuna, hollow or gap - English lacuna.",
  Brumal: "Latin - bruma, winter or winter solstice - English brumal.",
  Solivagant: "Latin - solus, alone - Latin vagari, to wander - English solivagant.",
  Anfractuous: "Latin - anfractus, a bending or winding - English anfractuous.",
  Komorebi: "Japanese - ko, tree - more, filtering through - bi, sunlight - borrowed into English as komorebi."
};

const supplementalEtymologyPaths = {
  absorbing: "Latin - absorbere, to swallow up - English absorb, to take in completely - absorbing, something that takes in all your attention.",
  aesthetic: "Greek - aisthanesthai, to perceive - Greek aisthetikos, about perception - modern English aesthetic, concerned with beauty and artistic feeling.",
  aesthetical: "Greek - aisthanesthai, to perceive - Greek aisthetikos, about perception - English aesthetical, relating to beauty or taste.",
  beauteous: "Old French - beaute, beauty - English beauty - beauteous, a poetic form meaning full of beauty.",
  bonnie: "Scots - bonnie, pretty or pleasing - northern English and Scottish use - modern English bonnie.",
  comely: "Old English - cymlic, lovely or delicate - Middle English comely - modern English comely, pleasant to look at.",
  engrossing: "Old French - en gros, in bulk or wholesale - English engross, to occupy completely - engrossing, holding all of someone's attention.",
  exquisite: "Latin - exquirere, to seek out carefully - Latin exquisitus, carefully chosen - English exquisite, exceptionally fine or beautiful.",
  fascinating: "Latin - fascinare, to enchant or bewitch - English fascinate, to captivate - fascinating, holding the mind's attention.",
  glorious: "Latin - gloria, fame or renown - Old French glorieus - English glorious, full of splendour or praise.",
  gorgeous: "Old French - gorgias, elegant or showy - Middle English gorgeous - modern English gorgeous, richly beautiful.",
  gripping: "Old English - gripe, grasp or clutch - English grip, to hold firmly - gripping, holding attention firmly.",
  handsome: "Middle English - hand + some, easy to handle or convenient - later English handsome, pleasing in appearance.",
  intriguing: "French - intriguer, to entangle or plot - English intrigue, to arouse curiosity - intriguing, making you want to know more.",
  lovely: "Old English - lufu, love - Old English -lic, like or having the form of - lovely, loveable or beautiful.",
  ravishing: "Old French - ravir, to seize or carry away - English ravish, to delight intensely - ravishing, overwhelmingly beautiful.",
  riveting: "Old French - river, to fasten with a rivet - English rivet, to fix firmly - riveting, fixing your attention in place.",
  scenic: "Greek - skene, stage or tent - Latin scaena, scene - English scenic, relating to views or scenery.",
  sightly: "Old English - sihth, sight - Old English -lic, like - sightly, pleasing to the sight.",
  splendid: "Latin - splendidus, bright or shining - English splendid, impressive or magnificent.",
  splendiferous: "Latin - splendere, to shine - English splendid + playful -iferous form - splendiferous, splendid in an exuberant way.",
  stunning: "Old French - estoner, to stun or astonish - English stun - stunning, so impressive it seems to stop you.",
  unputdownable: "English - put down, stop holding or reading - un- not + -able able to be - unputdownable, so engaging you cannot stop reading."
};

const etymologyPatterns = [
  { pattern: /ous$/, suffix: "-ous", explanation: "The ending -ous came through Old French from Latin -osus, meaning full of or marked by. English uses it to turn a root into a quality: the word means having that quality." },
  { pattern: /ive$/, suffix: "-ive", explanation: "The ending -ive comes from Latin -ivus through French. It usually means tending to, able to, or having the force of the root idea." },
  { pattern: /ing$/, suffix: "-ing", explanation: "The ending -ing comes from Old English. It turns an action into an ongoing quality, so the word describes something actively producing that effect." },
  { pattern: /ity$/, suffix: "-ity", explanation: "The ending -ity comes from Latin -itas through French. It turns an adjective into a noun meaning the state or quality of that idea." },
  { pattern: /(ence|ance)$/, suffix: "-ence/-ance", explanation: "The endings -ence and -ance come from Latin noun forms through French. They name a state, action, or condition connected with the root." },
  { pattern: /(ant|ent)$/, suffix: "-ant/-ent", explanation: "The endings -ant and -ent come from Latin present participles through French. They often describe something doing, showing, or carrying the root action." },
  { pattern: /ate$/, suffix: "-ate", explanation: "The ending -ate often comes from Latin -atus. In English it commonly marks a verb or adjective connected with making, doing, or being shaped by the root." },
  { pattern: /(ary|ory)$/, suffix: "-ary/-ory", explanation: "The endings -ary and -ory come from Latin forms meaning connected with or belonging to. English uses them for relation, role, or function." },
  { pattern: /(al|ic|ine|ile)$/, suffix: "descriptive ending", explanation: "This kind of ending usually entered English through Latin, Greek, French, or scholarly writing. It makes a word describe the nature or quality of its root." },
  { pattern: /ly$/, suffix: "-ly", explanation: "The ending -ly developed from Old English -lic, meaning like or having the form of. It often makes a word mean having that quality or manner." }
];

const usageCategories = {
  promise: {
    test: /promise|promising|likely to develop|desirable fashion/,
    templates: [
      "The early results were {word}, so the team decided to continue.",
      "Her first draft was {word}, even though it still needed work.",
      "The idea looked {word} once they tested it with real users.",
      "It was a {word} start to a project that could grow."
    ]
  },
  visibility: {
    test: /seen|noticed|visible|noticeable|capable of being seen/,
    templates: [
      "The scratch was {word} once the light hit the table.",
      "Her absence became {word} after the meeting began.",
      "The change was {word}, but not distracting.",
      "A {word} mark on the page showed where the ink had spread."
    ]
  },
  affirmation: {
    test: /positive|affirmation|approving|encouraging|goodwill/,
    templates: [
      "Her feedback was {word}, which made the team feel more confident.",
      "The first response was {word}, so they shared the idea more widely.",
      "He tried to keep the conversation {word} even when the details were difficult.",
      "A {word} message arrived just when she needed encouragement."
    ]
  },
  attention: {
    test: /attention|captivat|engross|interesting|spectator|curious|intrigu|gripping|compelling|fascinat|remarkable|notable|noteworthy|exciting/,
    templates: [
      "The documentary was {word}; I forgot to check my phone until it ended.",
      "Her story was so {word} that the whole table went quiet.",
      "The opening chapter felt {word}, so I kept reading past midnight.",
      "It was {article} {word} lecture because every example led to a new question."
    ]
  },
  beauty: {
    test: /beautiful|attractive|pleasing|good-looking|splendid|magnificent|scenery|pretty|shiny|colourful|grace|appearance/,
    templates: [
      "The garden looked {word} after the rain cleared.",
      "The view from the hill was {word} at sunset.",
      "The old theatre was unexpectedly {word} in the evening light.",
      "The design felt {word} without being too polished."
    ]
  },
  importance: {
    test: /important|significant|major effect|crucial|relevant|pertinent|valuable|meaning|worth|beneficial|helpful|practical|useful|instruction|information/,
    templates: [
      "That detail was {word} because it changed how we understood the problem.",
      "Her advice proved {word} when the project became more complicated.",
      "The report was {word} to anyone trying to understand the decision.",
      "{articleCap} {word} example can make a difficult idea much easier to remember."
    ]
  },
  strangeness: {
    test: /strange|mysterious|odd|unusual|weird|uncanny|peculiar|abnormal|bizarre|unknown/,
    templates: [
      "There was something {word} about the empty platform at noon.",
      "His answer sounded {word}, so I asked him to explain it again.",
      "The house felt {word} once all the lights had gone out.",
      "{articleCap} {word} silence followed the announcement."
    ]
  },
  quiet: {
    test: /quiet|silent|soft|calm|peace|gentle|still|hushed|faint/,
    templates: [
      "The library felt {word} after the rain began tapping the windows.",
      "She spoke in {article} {word} voice so she would not wake the child.",
      "The morning was {word}, with only the kettle making noise.",
      "{articleCap} {word} pause settled between them before anyone replied."
    ]
  },
  light: {
    test: /bright|light|shining|radiant|glow|clear|luminous|colour/,
    templates: [
      "The kitchen looked {word} once the blinds were opened.",
      "{articleCap} {word} line of sun crossed the floorboards.",
      "Her face seemed {word} when she heard the good news.",
      "The room became {word} as the clouds moved away."
    ]
  },
  movement: {
    test: /moving|quick|swift|slow|fluid|graceful|motion|active|energetic|walk|carry|transport|move/,
    templates: [
      "Her movement was {word}, but never rushed.",
      "The team became more {word} once they understood the plan.",
      "He made {article} {word} gesture toward the door.",
      "The river looked {word} where it narrowed between the stones."
    ]
  },
  clarity: {
    test: /clear|precise|exact|careful|accurate|readable|understand|instructive|informative|knowledge|good sense|judgement|reason|wisdom/,
    templates: [
      "Her explanation was {word}, and the class understood the idea at once.",
      "The editor asked for {article} more {word} title.",
      "{articleCap} {word} sentence can do more work than a long paragraph.",
      "The instructions became {word} after she added one example."
    ]
  },
  feeling: {
    test: /emotion|feeling|kindness|consideration|happy|sad|joy|sorrow|affecting|touching|desire|welfare/,
    templates: [
      "His reply was {word}, but he tried to hide how much it mattered.",
      "The film became {word} in its final quiet scene.",
      "She gave {article} {word} smile when she saw the old photograph.",
      "The letter was {word} without becoming sentimental."
    ]
  },
  memory: {
    test: /old|ancient|historic|traditional|former|past|memory|remember|recorded/,
    templates: [
      "The village had {article} {word} charm that made visitors slow down.",
      "He kept {article} {word} map folded inside the book.",
      "The story felt {word}, as if it had been told for generations.",
      "{articleCap} {word} custom survived in the family long after they moved away."
    ]
  }
};

const topicCategory = {
  interesting: "attention",
  beautiful: "beauty",
  strange: "strangeness",
  feeling: "feeling",
  nature: "light",
  thought: "clarity",
  language: "clarity",
  sound: "quiet",
  light: "light",
  movement: "movement",
  old: "memory",
  obscure: "strangeness",
  precise: "clarity",
  vivid: "light",
  subtle: "quiet",
  poetic: "beauty",
  rare: "strangeness",
  curious: "attention",
  knowledge: "clarity",
  memory: "memory",
  wonder: "attention",
  quiet: "quiet",
  bright: "light",
  mystery: "strangeness"
};

const nounUsageTemplates = [
  "The {word} of the idea became clearer after she gave an example.",
  "We only understood the {word} of the problem after seeing the results.",
  "His answer revealed the {word} that everyone had missed.",
  "The discussion turned on the {word} of one small detail.",
  "A feeling of {word} stayed with her all afternoon.",
  "The room carried {article} strange {word} after the news arrived."
];

const verbUsageTemplates = [
  "She used the final paragraph to {word} what she really meant.",
  "He tried to {word} the idea without sounding too formal.",
  "The teacher asked him to {word} the answer in simpler language.",
  "A good title can {word} the mood of the whole essay.",
  "They had to {word} the plan before the deadline changed."
];

const adverbUsageTemplates = [
  "She answered {word}, as if choosing every phrase with care.",
  "The child stepped {word} into the room.",
  "He explained the change {word}, leaving no one confused.",
  "The choir sang {word} in the old chapel."
];

function usageArticle(word) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function fillUsageTemplate(template, word) {
  const article = usageArticle(word);
  return template
    .replaceAll("{articleCap}", article.charAt(0).toUpperCase() + article.slice(1))
    .replaceAll("{article}", article)
    .replaceAll("{word}", word)
    .replace(/\s+/g, " ")
    .trim();
}

function chooseUsageTemplate(templates, word) {
  const seed = [...word].reduce((total, char) => total + char.charCodeAt(0), 0);
  return templates[seed % templates.length];
}

function makeUsageSentence(record) {
  if (record.pos === "n") return fillUsageTemplate(chooseUsageTemplate(nounUsageTemplates, record.word), record.word);
  if (record.pos === "v") return fillUsageTemplate(chooseUsageTemplate(verbUsageTemplates, record.word), record.word);
  if (record.pos === "adv") return fillUsageTemplate(chooseUsageTemplate(adverbUsageTemplates, record.word), record.word);

  const definition = (record.word + " " + record.definition).toLowerCase();
  const preferTopic = ["beautiful", "strange", "feeling", "nature", "sound", "light", "movement", "old", "quiet", "poetic", "vivid", "subtle", "mystery", "memory"].includes(record.topic);
  const categoryName = topicCategory[record.topic];
  const definitionCategory = Object.values(usageCategories).find((item) => item.test.test(definition));
  const category = preferTopic ? usageCategories[categoryName] : definitionCategory || usageCategories[categoryName] || usageCategories.clarity;
  const template = chooseUsageTemplate(category.templates, record.word);
  return fillUsageTemplate(template, record.word);
}

function toDisplayWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function makePronunciationHint(word) {
  return word
    .replace(/tion$/, "-shun")
    .replace(/ious$/, "-ee-us")
    .replace(/ous$/, "-us")
    .replace(/ity$/, "-i-tee")
    .replace(/ence$/, "-ens")
    .replace(/ance$/, "-ans");
}

function baseFromSuffix(word, suffix) {
  if (suffix === "-ing" && word.endsWith("ing")) {
    const base = word.slice(0, -3);
    return base.replace(/([b-df-hj-np-tv-z])\1$/, "$1");
  }

  if (suffix === "-ity" && word.endsWith("ity")) return word.slice(0, -3);
  if (suffix === "-ous" && word.endsWith("ous")) return word.slice(0, -3);
  if (suffix === "-ive" && word.endsWith("ive")) return word.slice(0, -3);
  if (suffix === "-ly" && word.endsWith("ly")) return word.slice(0, -2);
  if (suffix === "-ate" && word.endsWith("ate")) return word.slice(0, -3);

  return word;
}

function makeEtymologyPath(record) {
  const word = record.word;
  if (supplementalEtymologyPaths[word]) return supplementalEtymologyPaths[word];

  const match = etymologyPatterns.find((item) => item.pattern.test(word));
  if (match) {
    const base = baseFromSuffix(word, match.suffix);
    return "Built from the word family around \"" + base + "\" plus " + match.suffix + ". " + match.explanation;
  }

  return "This word belongs to the English word family around " + record.topic + ". Its modern meaning developed through use as a word for " + record.definition.toLowerCase();
}

function createSupplementalWord(record, index) {
  const display = toDisplayWord(record.word);
  const posName = record.pos === "n" ? "noun" : record.pos === "v" ? "verb" : record.pos === "adv" ? "adverb" : "adjective";
  const article = /^[aeiou]/i.test(posName) ? "an" : "a";

  return {
    word: display,
    pronunciation: makePronunciationHint(record.word),
    difficulty: index % 4 === 0 ? "Useful" : index % 4 === 1 ? "Curious" : index % 4 === 2 ? "Literary" : "Rare",
    tone: record.topic,
    description: display + " is " + article + " " + posName + ": " + record.definition,
    usage: makeUsageSentence(record),
    etymology: makeEtymologyPath(record),
    example: makeUsageSentence(record),
    tags: [posName, record.topic, record.word.slice(0, 3), record.word.slice(-3)]
  };
}

function enrichFeaturedWord(word) {
  return {
    ...word,
    usage: word.example,
    etymology: featuredEtymologyPaths[word.word] || word.etymology
  };
}


const baseEverydayWords = [
  {
    "word": "Nuance",
    "pronunciation": "NOO-ahns",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "A small but important difference in meaning, feeling, or tone.",
    "usage": "Her answer had nuance: she agreed with the idea, but not with the timing.",
    "etymology": "Latin - nubes, cloud - French nuance, shade or subtle difference - English nuance.",
    "example": "Her answer had nuance: she agreed with the idea, but not with the timing.",
    "tags": [
      "meaning",
      "everyday"
    ]
  },
  {
    "word": "Candid",
    "pronunciation": "KAN-did",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Honest and direct, especially in a helpful or refreshing way.",
    "usage": "He gave a candid answer instead of pretending everything was fine.",
    "etymology": "Latin - candidus, white or clear - English candid, open and honest.",
    "example": "He gave a candid answer instead of pretending everything was fine.",
    "tags": [
      "honesty",
      "everyday"
    ]
  },
  {
    "word": "Empathy",
    "pronunciation": "EM-puh-thee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "The ability to understand and share what someone else is feeling.",
    "usage": "A little empathy made the conversation much easier.",
    "etymology": "Greek - en, in - pathos, feeling - English empathy.",
    "example": "A little empathy made the conversation much easier.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Resilient",
    "pronunciation": "ri-ZIL-yunt",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to recover after difficulty, pressure, or disappointment.",
    "usage": "She felt tired, but she stayed resilient and tried again.",
    "etymology": "Latin - resilire, to spring back - English resilient.",
    "example": "She felt tired, but she stayed resilient and tried again.",
    "tags": [
      "strength",
      "everyday"
    ]
  },
  {
    "word": "Curious",
    "pronunciation": "KYOOR-ee-us",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Wanting to know, learn, or understand more.",
    "usage": "I was curious about why the room suddenly went quiet.",
    "etymology": "Latin - cura, care - curiosus, careful or inquisitive - English curious.",
    "example": "I was curious about why the room suddenly went quiet.",
    "tags": [
      "learning",
      "everyday"
    ]
  },
  {
    "word": "Subtle",
    "pronunciation": "SUT-uhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Not obvious, but important when you notice it.",
    "usage": "There was a subtle change in his voice when he mentioned home.",
    "etymology": "Latin - subtilis, finely woven or precise - English subtle.",
    "example": "There was a subtle change in his voice when he mentioned home.",
    "tags": [
      "meaning",
      "everyday"
    ]
  },
  {
    "word": "Vivid",
    "pronunciation": "VIV-id",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Clear, strong, and full of life or colour.",
    "usage": "She gave a vivid description of the market at night.",
    "etymology": "Latin - vividus, lively - English vivid.",
    "example": "She gave a vivid description of the market at night.",
    "tags": [
      "expression",
      "everyday"
    ]
  },
  {
    "word": "Concise",
    "pronunciation": "kun-SYSE",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Short and clear, without unnecessary words.",
    "usage": "His email was concise, but it still answered every question.",
    "etymology": "Latin - concidere, to cut short - French concis - English concise.",
    "example": "His email was concise, but it still answered every question.",
    "tags": [
      "language",
      "everyday"
    ]
  },
  {
    "word": "Humble",
    "pronunciation": "HUM-buhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Not acting as if you are more important than others.",
    "usage": "Even after the award, she stayed humble and thanked the whole team.",
    "etymology": "Latin - humilis, low or grounded - English humble.",
    "example": "Even after the award, she stayed humble and thanked the whole team.",
    "tags": [
      "character",
      "everyday"
    ]
  },
  {
    "word": "Generous",
    "pronunciation": "JEN-uh-rus",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Willing to give time, help, attention, or kindness.",
    "usage": "It was generous of him to stay late and help me finish.",
    "etymology": "Latin - genus, birth or kind - generosus, noble - English generous.",
    "example": "It was generous of him to stay late and help me finish.",
    "tags": [
      "kindness",
      "everyday"
    ]
  },
  {
    "word": "Awkward",
    "pronunciation": "AWK-wurd",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Uncomfortable, clumsy, or difficult to handle smoothly.",
    "usage": "There was an awkward pause after I forgot his name.",
    "etymology": "Old Norse - afugr, turned the wrong way - English awkward.",
    "example": "There was an awkward pause after I forgot his name.",
    "tags": [
      "social",
      "everyday"
    ]
  },
  {
    "word": "Thoughtful",
    "pronunciation": "THAWT-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Showing care, attention, or consideration.",
    "usage": "Her thoughtful message arrived exactly when I needed it.",
    "etymology": "Old English - thencan, to think - English thoughtful.",
    "example": "Her thoughtful message arrived exactly when I needed it.",
    "tags": [
      "kindness",
      "everyday"
    ]
  },
  {
    "word": "Reliable",
    "pronunciation": "ri-LY-uh-buhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to be trusted or depended on.",
    "usage": "He is reliable; if he says he will call, he calls.",
    "etymology": "Old French - relier, to bind or attach - English rely - reliable.",
    "example": "He is reliable; if he says he will call, he calls.",
    "tags": [
      "trust",
      "everyday"
    ]
  },
  {
    "word": "Flexible",
    "pronunciation": "FLEK-suh-buhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to change or adapt when needed.",
    "usage": "We need a flexible plan in case the weather changes.",
    "etymology": "Latin - flectere, to bend - English flexible.",
    "example": "We need a flexible plan in case the weather changes.",
    "tags": [
      "change",
      "everyday"
    ]
  },
  {
    "word": "Cautious",
    "pronunciation": "KAW-shus",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Careful because there may be risk.",
    "usage": "She was cautious about sharing the news too early.",
    "etymology": "Latin - cavere, to beware - caution - English cautious.",
    "example": "She was cautious about sharing the news too early.",
    "tags": [
      "care",
      "everyday"
    ]
  },
  {
    "word": "Sincere",
    "pronunciation": "sin-SEER",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Real and honest, not fake or forced.",
    "usage": "His apology sounded sincere, so I believed him.",
    "etymology": "Latin - sincerus, clean or pure - English sincere.",
    "example": "His apology sounded sincere, so I believed him.",
    "tags": [
      "honesty",
      "everyday"
    ]
  },
  {
    "word": "Graceful",
    "pronunciation": "GRAYS-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Moving, behaving, or expressing something with ease and beauty.",
    "usage": "She gave a graceful reply to a difficult question.",
    "etymology": "Latin - gratia, favour or charm - English grace - graceful.",
    "example": "She gave a graceful reply to a difficult question.",
    "tags": [
      "style",
      "everyday"
    ]
  },
  {
    "word": "Witty",
    "pronunciation": "WIT-ee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Clever and funny in a quick way.",
    "usage": "Her witty comment made everyone laugh without being unkind.",
    "etymology": "Old English - witt, mind or understanding - English witty.",
    "example": "Her witty comment made everyone laugh without being unkind.",
    "tags": [
      "humour",
      "everyday"
    ]
  },
  {
    "word": "Earnest",
    "pronunciation": "UR-nist",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Serious, sincere, and clearly trying.",
    "usage": "He made an earnest attempt to fix the mistake.",
    "etymology": "Old English - eornost, seriousness - English earnest.",
    "example": "He made an earnest attempt to fix the mistake.",
    "tags": [
      "character",
      "everyday"
    ]
  },
  {
    "word": "Calm",
    "pronunciation": "KAHM",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Peaceful and not upset or excited.",
    "usage": "She stayed calm even when the train was cancelled.",
    "etymology": "Greek - kauma, heat of the day - Latin/French calme - English calm.",
    "example": "She stayed calm even when the train was cancelled.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Focused",
    "pronunciation": "FOH-kuhst",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Giving attention to one thing clearly.",
    "usage": "I work better when I am focused on one task.",
    "etymology": "Latin - focus, hearth or centre - English focus - focused.",
    "example": "I work better when I am focused on one task.",
    "tags": [
      "attention",
      "everyday"
    ]
  },
  {
    "word": "Patient",
    "pronunciation": "PAY-shunt",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to wait or continue without becoming annoyed.",
    "usage": "Please be patient while I learn the new system.",
    "etymology": "Latin - pati, to suffer or endure - English patient.",
    "example": "Please be patient while I learn the new system.",
    "tags": [
      "character",
      "everyday"
    ]
  },
  {
    "word": "Practical",
    "pronunciation": "PRAK-ti-kuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Useful and sensible in real situations.",
    "usage": "That is a practical solution, not just a clever idea.",
    "etymology": "Greek - praktikos, fit for action - English practical.",
    "example": "That is a practical solution, not just a clever idea.",
    "tags": [
      "usefulness",
      "everyday"
    ]
  },
  {
    "word": "Confident",
    "pronunciation": "KON-fi-dunt",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Feeling sure about yourself or about what will happen.",
    "usage": "She sounded confident during the presentation.",
    "etymology": "Latin - confidere, to trust fully - English confident.",
    "example": "She sounded confident during the presentation.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Gentle",
    "pronunciation": "JEN-tuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Kind, soft, or careful in manner.",
    "usage": "He used a gentle voice so the child would not feel scared.",
    "etymology": "Latin - gentilis, of the same family - Old French gentil - English gentle.",
    "example": "He used a gentle voice so the child would not feel scared.",
    "tags": [
      "kindness",
      "everyday"
    ]
  },
  {
    "word": "Brave",
    "pronunciation": "BRAYV",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Ready to face fear, danger, or difficulty.",
    "usage": "It was brave of her to ask the question everyone avoided.",
    "etymology": "Italian/Spanish - bravo, bold or wild - English brave.",
    "example": "It was brave of her to ask the question everyone avoided.",
    "tags": [
      "courage",
      "everyday"
    ]
  },
  {
    "word": "Clever",
    "pronunciation": "KLEV-er",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Quick to understand, learn, or solve problems.",
    "usage": "That was a clever way to explain a difficult idea.",
    "etymology": "Middle English - clever, skilful with the hands - modern English clever.",
    "example": "That was a clever way to explain a difficult idea.",
    "tags": [
      "mind",
      "everyday"
    ]
  },
  {
    "word": "Tidy",
    "pronunciation": "TY-dee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Neat and well arranged.",
    "usage": "A tidy desk helps me think more clearly.",
    "etymology": "Old English - tid, time or season - tidy, timely then neat - English tidy.",
    "example": "A tidy desk helps me think more clearly.",
    "tags": [
      "order",
      "everyday"
    ]
  },
  {
    "word": "Messy",
    "pronunciation": "MES-ee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Untidy, complicated, or not easy to control.",
    "usage": "The first draft was messy, but the idea was strong.",
    "etymology": "Middle English - mes, portion of food or mixed serving - English mess - messy.",
    "example": "The first draft was messy, but the idea was strong.",
    "tags": [
      "order",
      "everyday"
    ]
  },
  {
    "word": "Honest",
    "pronunciation": "ON-ist",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Truthful and not trying to deceive.",
    "usage": "Give me an honest opinion, even if it is not perfect.",
    "etymology": "Latin - honestus, honourable - Old French honeste - English honest.",
    "example": "Give me an honest opinion, even if it is not perfect.",
    "tags": [
      "honesty",
      "everyday"
    ]
  },
  {
    "word": "Loyal",
    "pronunciation": "LOY-uhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Faithful and supportive over time.",
    "usage": "She has been a loyal friend through every difficult year.",
    "etymology": "Latin - legalis, lawful - Old French loial - English loyal.",
    "example": "She has been a loyal friend through every difficult year.",
    "tags": [
      "trust",
      "everyday"
    ]
  },
  {
    "word": "Anxious",
    "pronunciation": "ANGK-shus",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Worried or nervous about something uncertain.",
    "usage": "I felt anxious before the interview, but it went well.",
    "etymology": "Latin - angere, to choke or distress - English anxious.",
    "example": "I felt anxious before the interview, but it went well.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Relieved",
    "pronunciation": "ri-LEEVD",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Feeling better because worry or pain has passed.",
    "usage": "I was relieved when the missing keys turned up.",
    "etymology": "Latin - relevare, to lift up - English relieve - relieved.",
    "example": "I was relieved when the missing keys turned up.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Inspired",
    "pronunciation": "in-SPY-urd",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Filled with energy, ideas, or motivation.",
    "usage": "After the talk, I felt inspired to start writing again.",
    "etymology": "Latin - inspirare, to breathe into - English inspire - inspired.",
    "example": "After the talk, I felt inspired to start writing again.",
    "tags": [
      "motivation",
      "everyday"
    ]
  },
  {
    "word": "Hopeful",
    "pronunciation": "HOHP-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Feeling that something good may happen.",
    "usage": "I am hopeful that tomorrow will be easier.",
    "etymology": "Old English - hopa, confidence or expectation - English hopeful.",
    "example": "I am hopeful that tomorrow will be easier.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Grateful",
    "pronunciation": "GRAYT-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Feeling thankful for something kind or helpful.",
    "usage": "I am grateful for your patience today.",
    "etymology": "Latin - gratus, pleasing or thankful - English grateful.",
    "example": "I am grateful for your patience today.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Nostalgic",
    "pronunciation": "no-STAL-jik",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Feeling affection or longing for the past.",
    "usage": "The song made me nostalgic for summers at home.",
    "etymology": "Greek - nostos, return home - algos, pain - English nostalgic.",
    "example": "The song made me nostalgic for summers at home.",
    "tags": [
      "memory",
      "everyday"
    ]
  },
  {
    "word": "Ambitious",
    "pronunciation": "am-BISH-us",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Having a strong wish to achieve something.",
    "usage": "It is an ambitious plan, but it might work.",
    "etymology": "Latin - ambitio, going around to seek favour - English ambitious.",
    "example": "It is an ambitious plan, but it might work.",
    "tags": [
      "drive",
      "everyday"
    ]
  },
  {
    "word": "Stubborn",
    "pronunciation": "STUB-urn",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Refusing to change your mind easily.",
    "usage": "He can be stubborn, but sometimes that helps him finish hard things.",
    "etymology": "Old English - stybb, stump - English stubborn, hard to move.",
    "example": "He can be stubborn, but sometimes that helps him finish hard things.",
    "tags": [
      "character",
      "everyday"
    ]
  },
  {
    "word": "Mindful",
    "pronunciation": "MYND-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Paying attention with care and awareness.",
    "usage": "Try to be mindful of how much space others need.",
    "etymology": "Old English - gemynd, memory or thought - English mindful.",
    "example": "Try to be mindful of how much space others need.",
    "tags": [
      "attention",
      "everyday"
    ]
  },
  {
    "word": "Restless",
    "pronunciation": "REST-lis",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Unable to relax or stay still.",
    "usage": "I felt restless after sitting inside all day.",
    "etymology": "Old English - rest - suffix -less, without - English restless.",
    "example": "I felt restless after sitting inside all day.",
    "tags": [
      "feeling",
      "everyday"
    ]
  },
  {
    "word": "Bold",
    "pronunciation": "BOHLD",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Confident, brave, or visually strong.",
    "usage": "That was a bold decision, but it paid off.",
    "etymology": "Old English - beald, brave or confident - English bold.",
    "example": "That was a bold decision, but it paid off.",
    "tags": [
      "courage",
      "everyday"
    ]
  },
  {
    "word": "Modest",
    "pronunciation": "MOD-ist",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Not too proud or large; simple in a good way.",
    "usage": "She made a modest suggestion that solved the whole problem.",
    "etymology": "Latin - modestus, moderate or restrained - English modest.",
    "example": "She made a modest suggestion that solved the whole problem.",
    "tags": [
      "character",
      "everyday"
    ]
  },
  {
    "word": "Elegant",
    "pronunciation": "EL-uh-gunt",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Simple, graceful, and pleasing in form or style.",
    "usage": "The solution was elegant because it used only three steps.",
    "etymology": "Latin - eligere, to choose - elegans, tasteful - English elegant.",
    "example": "The solution was elegant because it used only three steps.",
    "tags": [
      "style",
      "everyday"
    ]
  },
  {
    "word": "Cozy",
    "pronunciation": "KOH-zee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Comfortable, warm, and pleasant.",
    "usage": "The cafe felt cozy while the rain hit the windows.",
    "etymology": "Scots - cosie, snug or comfortable - English cozy.",
    "example": "The cafe felt cozy while the rain hit the windows.",
    "tags": [
      "comfort",
      "everyday"
    ]
  },
  {
    "word": "Lively",
    "pronunciation": "LYV-lee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Full of energy, movement, or interest.",
    "usage": "Dinner became lively once everyone started telling stories.",
    "etymology": "Old English - lif, life - lively, full of life.",
    "example": "Dinner became lively once everyone started telling stories.",
    "tags": [
      "energy",
      "everyday"
    ]
  },
  {
    "word": "Steady",
    "pronunciation": "STED-ee",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Firm, calm, and not easily changed.",
    "usage": "Her steady support helped me get through the week.",
    "etymology": "Old English - stede, place - steady, fixed or firm.",
    "example": "Her steady support helped me get through the week.",
    "tags": [
      "stability",
      "everyday"
    ]
  },
  {
    "word": "Capable",
    "pronunciation": "KAY-puh-buhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to do something well.",
    "usage": "You are more capable than you think.",
    "etymology": "Latin - capere, to take or hold - English capable.",
    "example": "You are more capable than you think.",
    "tags": [
      "ability",
      "everyday"
    ]
  },
  {
    "word": "Fragile",
    "pronunciation": "FRAJ-uhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Easily broken, damaged, or hurt.",
    "usage": "The plan felt fragile until we had more support.",
    "etymology": "Latin - fragilis, easily broken - English fragile.",
    "example": "The plan felt fragile until we had more support.",
    "tags": [
      "care",
      "everyday"
    ]
  },
  {
    "word": "Genuine",
    "pronunciation": "JEN-yoo-in",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Real, honest, and not fake.",
    "usage": "Her excitement was genuine; you could see it in her face.",
    "etymology": "Latin - genuinus, native or natural - English genuine.",
    "example": "Her excitement was genuine; you could see it in her face.",
    "tags": [
      "honesty",
      "everyday"
    ]
  },
  {
    "word": "Playful",
    "pronunciation": "PLAY-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Light, fun, and not too serious.",
    "usage": "The design feels playful without becoming childish.",
    "etymology": "Old English - plegian, to exercise or play - English playful.",
    "example": "The design feels playful without becoming childish.",
    "tags": [
      "tone",
      "everyday"
    ]
  },
  {
    "word": "Observant",
    "pronunciation": "ub-ZUR-vunt",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Good at noticing details.",
    "usage": "An observant reader will notice the clue in the first sentence.",
    "etymology": "Latin - observare, to watch or keep - English observant.",
    "example": "An observant reader will notice the clue in the first sentence.",
    "tags": [
      "attention",
      "everyday"
    ]
  },
  {
    "word": "Resourceful",
    "pronunciation": "ri-SORS-fuhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Good at finding clever ways to solve problems.",
    "usage": "She was resourceful when the original plan failed.",
    "etymology": "Old French - resourdre, to rise again - English resource - resourceful.",
    "example": "She was resourceful when the original plan failed.",
    "tags": [
      "ability",
      "everyday"
    ]
  },
  {
    "word": "Spontaneous",
    "pronunciation": "spon-TAY-nee-us",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Happening naturally, without much planning.",
    "usage": "We made a spontaneous decision to take the later train.",
    "etymology": "Latin - spontaneus, of free will - English spontaneous.",
    "example": "We made a spontaneous decision to take the later train.",
    "tags": [
      "action",
      "everyday"
    ]
  },
  {
    "word": "Considerate",
    "pronunciation": "kun-SID-er-it",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Thinking about other people’s feelings or needs.",
    "usage": "It was considerate of him to lower the music at night.",
    "etymology": "Latin - considerare, to look closely at - English considerate.",
    "example": "It was considerate of him to lower the music at night.",
    "tags": [
      "kindness",
      "everyday"
    ]
  },
  {
    "word": "Approachable",
    "pronunciation": "uh-PROH-chuh-buhl",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Easy to talk to or ask for help.",
    "usage": "The new manager seems approachable and friendly.",
    "etymology": "Latin - appropiare, to come nearer - English approach - approachable.",
    "example": "The new manager seems approachable and friendly.",
    "tags": [
      "social",
      "everyday"
    ]
  },
  {
    "word": "Persuasive",
    "pronunciation": "pur-SWAY-siv",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to make people agree or believe something.",
    "usage": "Her argument was persuasive because she used clear examples.",
    "etymology": "Latin - persuadere, to convince - English persuasive.",
    "example": "Her argument was persuasive because she used clear examples.",
    "tags": [
      "language",
      "everyday"
    ]
  },
  {
    "word": "Articulate",
    "pronunciation": "ar-TIK-yuh-lit",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Able to express ideas clearly.",
    "usage": "He is articulate when he explains what the team needs.",
    "etymology": "Latin - articulus, small joint or distinct part - English articulate.",
    "example": "He is articulate when he explains what the team needs.",
    "tags": [
      "language",
      "everyday"
    ]
  },
  {
    "word": "Deliberate",
    "pronunciation": "di-LIB-er-it",
    "difficulty": "Everyday",
    "tone": "everyday",
    "description": "Done carefully and intentionally.",
    "usage": "She made a deliberate choice to speak more slowly.",
    "etymology": "Latin - deliberare, to weigh carefully - English deliberate.",
    "example": "She made a deliberate choice to speak more slowly.",
    "tags": [
      "care",
      "everyday"
    ]
  }
];

const basePolishedWords = [
  {
    "word": "Astute",
    "pronunciation": "uh-STYOOT",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Quick to notice and understand what is really happening.",
    "usage": "Her astute question revealed the weakness in the plan.",
    "etymology": "Latin - astutus, crafty or clever - French astut - English astute.",
    "example": "Her astute question revealed the weakness in the plan.",
    "tags": [
      "insight",
      "polished"
    ]
  },
  {
    "word": "Pragmatic",
    "pronunciation": "prag-MAT-ik",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Focused on what works in real life, not just theory.",
    "usage": "We took a pragmatic approach and solved the urgent problem first.",
    "etymology": "Greek - pragma, deed or action - English pragmatic.",
    "example": "We took a pragmatic approach and solved the urgent problem first.",
    "tags": [
      "practical",
      "polished"
    ]
  },
  {
    "word": "Eloquent",
    "pronunciation": "EL-uh-kwunt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Able to express ideas clearly, strongly, and beautifully.",
    "usage": "His eloquent speech made the complicated issue feel human.",
    "etymology": "Latin - eloqui, to speak out - English eloquent.",
    "example": "His eloquent speech made the complicated issue feel human.",
    "tags": [
      "language",
      "polished"
    ]
  },
  {
    "word": "Discerning",
    "pronunciation": "di-SUR-ning",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Good at judging quality, detail, or differences.",
    "usage": "A discerning reader will notice the quiet joke in the final line.",
    "etymology": "Latin - discernere, to separate or distinguish - English discerning.",
    "example": "A discerning reader will notice the quiet joke in the final line.",
    "tags": [
      "judgement",
      "polished"
    ]
  },
  {
    "word": "Poignant",
    "pronunciation": "POYN-yunt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Emotionally moving in a sharp, memorable way.",
    "usage": "Her final sentence was poignant without being sentimental.",
    "etymology": "Latin - pungere, to prick - French poignant - English poignant.",
    "example": "Her final sentence was poignant without being sentimental.",
    "tags": [
      "feeling",
      "polished"
    ]
  },
  {
    "word": "Candid",
    "pronunciation": "KAN-did",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Honest and direct without being cruel.",
    "usage": "His candid feedback helped me improve the presentation.",
    "etymology": "Latin - candidus, clear or white - English candid.",
    "example": "His candid feedback helped me improve the presentation.",
    "tags": [
      "honesty",
      "polished"
    ]
  },
  {
    "word": "Lucid",
    "pronunciation": "LOO-sid",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Clear and easy to understand.",
    "usage": "She gave a lucid explanation of a difficult subject.",
    "etymology": "Latin - lucidus, bright or clear - English lucid.",
    "example": "She gave a lucid explanation of a difficult subject.",
    "tags": [
      "clarity",
      "polished"
    ]
  },
  {
    "word": "Wry",
    "pronunciation": "RYE",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Dryly funny, often in a slightly ironic way.",
    "usage": "He gave a wry smile when the printer failed again.",
    "etymology": "Old English - wrigian, to turn - English wry.",
    "example": "He gave a wry smile when the printer failed again.",
    "tags": [
      "humour",
      "polished"
    ]
  },
  {
    "word": "Nuanced",
    "pronunciation": "NOO-ahnst",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Showing subtle differences rather than a simple yes or no.",
    "usage": "Her argument was nuanced, which made it more convincing.",
    "etymology": "Latin - nubes, cloud - French nuance, shade - English nuanced.",
    "example": "Her argument was nuanced, which made it more convincing.",
    "tags": [
      "meaning",
      "polished"
    ]
  },
  {
    "word": "Measured",
    "pronunciation": "MEH-zhurd",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Careful, calm, and not extreme.",
    "usage": "She gave a measured response instead of reacting immediately.",
    "etymology": "Latin - mensura, measure - English measured.",
    "example": "She gave a measured response instead of reacting immediately.",
    "tags": [
      "restraint",
      "polished"
    ]
  },
  {
    "word": "Apt",
    "pronunciation": "APT",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Exactly suitable or clever for the situation.",
    "usage": "That was an apt comparison for the problem we were discussing.",
    "etymology": "Latin - aptus, fitted or suitable - English apt.",
    "example": "That was an apt comparison for the problem we were discussing.",
    "tags": [
      "precision",
      "polished"
    ]
  },
  {
    "word": "Tactful",
    "pronunciation": "TAKT-fuhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Careful not to upset people while still being honest.",
    "usage": "Her tactful reply kept the meeting from becoming tense.",
    "etymology": "Latin - tactus, touch - English tact - tactful.",
    "example": "Her tactful reply kept the meeting from becoming tense.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Cogent",
    "pronunciation": "KOH-junt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Clear, logical, and convincing.",
    "usage": "He made a cogent case for changing the schedule.",
    "etymology": "Latin - cogere, to drive together - English cogent.",
    "example": "He made a cogent case for changing the schedule.",
    "tags": [
      "argument",
      "polished"
    ]
  },
  {
    "word": "Salient",
    "pronunciation": "SAY-lee-unt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Most important or noticeable.",
    "usage": "The salient point is that we need more time.",
    "etymology": "Latin - salire, to leap - English salient, standing out.",
    "example": "The salient point is that we need more time.",
    "tags": [
      "importance",
      "polished"
    ]
  },
  {
    "word": "Diligent",
    "pronunciation": "DIL-i-junt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Careful and persistent in doing work.",
    "usage": "Her diligent notes made the handover much easier.",
    "etymology": "Latin - diligere, to value or choose carefully - English diligent.",
    "example": "Her diligent notes made the handover much easier.",
    "tags": [
      "work",
      "polished"
    ]
  },
  {
    "word": "Judicious",
    "pronunciation": "joo-DISH-us",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Showing good judgement and careful thought.",
    "usage": "A judicious pause can be better than a quick answer.",
    "etymology": "Latin - judicium, judgement - English judicious.",
    "example": "A judicious pause can be better than a quick answer.",
    "tags": [
      "judgement",
      "polished"
    ]
  },
  {
    "word": "Succinct",
    "pronunciation": "suk-SINKT",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Brief but clear and complete.",
    "usage": "Please give me a succinct summary before the meeting.",
    "etymology": "Latin - succingere, to tuck up - English succinct, tightly expressed.",
    "example": "Please give me a succinct summary before the meeting.",
    "tags": [
      "language",
      "polished"
    ]
  },
  {
    "word": "Forthright",
    "pronunciation": "FORTH-ryt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Direct and honest in speech or behaviour.",
    "usage": "She was forthright about the risks from the beginning.",
    "etymology": "Old English - forth + right - English forthright.",
    "example": "She was forthright about the risks from the beginning.",
    "tags": [
      "honesty",
      "polished"
    ]
  },
  {
    "word": "Amiable",
    "pronunciation": "AY-mee-uh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Friendly, pleasant, and easy to like.",
    "usage": "He has an amiable way of making newcomers feel included.",
    "etymology": "Latin - amare, to love - French amiable - English amiable.",
    "example": "He has an amiable way of making newcomers feel included.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Perceptive",
    "pronunciation": "pur-SEP-tiv",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Able to notice or understand things quickly.",
    "usage": "Her perceptive comment changed the direction of the discussion.",
    "etymology": "Latin - percipere, to seize or understand - English perceptive.",
    "example": "Her perceptive comment changed the direction of the discussion.",
    "tags": [
      "insight",
      "polished"
    ]
  },
  {
    "word": "Resolute",
    "pronunciation": "REZ-uh-loot",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Firm and determined.",
    "usage": "She remained resolute even when the answer was no.",
    "etymology": "Latin - resolvere, to loosen or settle - English resolute.",
    "example": "She remained resolute even when the answer was no.",
    "tags": [
      "strength",
      "polished"
    ]
  },
  {
    "word": "Earnest",
    "pronunciation": "UR-nist",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Sincere and serious in intention.",
    "usage": "His earnest apology made the room soften.",
    "etymology": "Old English - eornost, seriousness - English earnest.",
    "example": "His earnest apology made the room soften.",
    "tags": [
      "sincerity",
      "polished"
    ]
  },
  {
    "word": "Incisive",
    "pronunciation": "in-SY-siv",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Clear, sharp, and direct in thought or expression.",
    "usage": "Her incisive question cut through the confusion.",
    "etymology": "Latin - incidere, to cut into - English incisive.",
    "example": "Her incisive question cut through the confusion.",
    "tags": [
      "clarity",
      "polished"
    ]
  },
  {
    "word": "Composed",
    "pronunciation": "kum-POHZD",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Calm and in control of yourself.",
    "usage": "He stayed composed during a difficult conversation.",
    "etymology": "Latin - componere, to put together - English composed.",
    "example": "He stayed composed during a difficult conversation.",
    "tags": [
      "calm",
      "polished"
    ]
  },
  {
    "word": "Cordial",
    "pronunciation": "KOR-dee-uhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Warm, polite, and friendly.",
    "usage": "The two teams kept a cordial tone during the negotiation.",
    "etymology": "Latin - cor, heart - English cordial.",
    "example": "The two teams kept a cordial tone during the negotiation.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Pensive",
    "pronunciation": "PEN-siv",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Quietly thoughtful, often with a serious mood.",
    "usage": "She became pensive after reading the old letter.",
    "etymology": "Latin - pensare, to weigh or ponder - French pensif - English pensive.",
    "example": "She became pensive after reading the old letter.",
    "tags": [
      "thought",
      "polished"
    ]
  },
  {
    "word": "Tenacious",
    "pronunciation": "tuh-NAY-shus",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Holding firmly to something; not giving up easily.",
    "usage": "His tenacious effort kept the project alive.",
    "etymology": "Latin - tenere, to hold - English tenacious.",
    "example": "His tenacious effort kept the project alive.",
    "tags": [
      "strength",
      "polished"
    ]
  },
  {
    "word": "Affable",
    "pronunciation": "AF-uh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Easy and pleasant to talk to.",
    "usage": "The host was affable without seeming fake.",
    "etymology": "Latin - affari, to speak to - English affable.",
    "example": "The host was affable without seeming fake.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Meticulous",
    "pronunciation": "muh-TIK-yuh-lus",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Very careful about small details.",
    "usage": "Her meticulous planning saved us from several mistakes.",
    "etymology": "Latin - meticulosus, fearful or careful - English meticulous.",
    "example": "Her meticulous planning saved us from several mistakes.",
    "tags": [
      "care",
      "polished"
    ]
  },
  {
    "word": "Diplomatic",
    "pronunciation": "dip-luh-MAT-ik",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Skilled at handling people or conflict tactfully.",
    "usage": "He gave a diplomatic answer that kept both sides talking.",
    "etymology": "Greek - diploma, folded paper or official document - English diplomatic.",
    "example": "He gave a diplomatic answer that kept both sides talking.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Cerebral",
    "pronunciation": "suh-REE-bruhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Intellectual rather than emotional or physical.",
    "usage": "The film was cerebral, but still surprisingly moving.",
    "etymology": "Latin - cerebrum, brain - English cerebral.",
    "example": "The film was cerebral, but still surprisingly moving.",
    "tags": [
      "mind",
      "polished"
    ]
  },
  {
    "word": "Artful",
    "pronunciation": "ART-fuhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Clever and skilful, sometimes with a hint of craftiness.",
    "usage": "Her artful phrasing made the criticism sound gentle.",
    "etymology": "Latin - ars, skill - English art - artful.",
    "example": "Her artful phrasing made the criticism sound gentle.",
    "tags": [
      "skill",
      "polished"
    ]
  },
  {
    "word": "Urbane",
    "pronunciation": "ur-BAYN",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Polished, confident, and socially graceful.",
    "usage": "His urbane humour made the formal dinner feel relaxed.",
    "etymology": "Latin - urbanus, of the city - English urbane.",
    "example": "His urbane humour made the formal dinner feel relaxed.",
    "tags": [
      "style",
      "polished"
    ]
  },
  {
    "word": "Empathetic",
    "pronunciation": "em-puh-THET-ik",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Able to understand other people’s feelings.",
    "usage": "Her empathetic reply made him feel less alone.",
    "etymology": "Greek - en, in - pathos, feeling - English empathetic.",
    "example": "Her empathetic reply made him feel less alone.",
    "tags": [
      "feeling",
      "polished"
    ]
  },
  {
    "word": "Tenable",
    "pronunciation": "TEN-uh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Reasonable enough to be defended or maintained.",
    "usage": "That explanation is tenable, but we still need evidence.",
    "etymology": "Latin - tenere, to hold - English tenable.",
    "example": "That explanation is tenable, but we still need evidence.",
    "tags": [
      "argument",
      "polished"
    ]
  },
  {
    "word": "Plausible",
    "pronunciation": "PLAW-zuh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Seeming reasonable or believable.",
    "usage": "Her explanation sounded plausible, so we checked the dates.",
    "etymology": "Latin - plaudere, to applaud - English plausible, worthy of approval then believable.",
    "example": "Her explanation sounded plausible, so we checked the dates.",
    "tags": [
      "argument",
      "polished"
    ]
  },
  {
    "word": "Amenable",
    "pronunciation": "uh-MEE-nuh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Open to suggestion or willing to cooperate.",
    "usage": "I am amenable to changing the plan if it helps the team.",
    "etymology": "Old French - amener, to lead or bring - English amenable.",
    "example": "I am amenable to changing the plan if it helps the team.",
    "tags": [
      "cooperation",
      "polished"
    ]
  },
  {
    "word": "Decisive",
    "pronunciation": "di-SY-siv",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Able to decide clearly and quickly.",
    "usage": "A decisive answer helped everyone move forward.",
    "etymology": "Latin - decidere, to cut off or settle - English decisive.",
    "example": "A decisive answer helped everyone move forward.",
    "tags": [
      "decision",
      "polished"
    ]
  },
  {
    "word": "Convivial",
    "pronunciation": "kun-VIV-ee-uhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Friendly, lively, and enjoyable in company.",
    "usage": "The dinner had a convivial mood from the first toast.",
    "etymology": "Latin - convivium, feast - English convivial.",
    "example": "The dinner had a convivial mood from the first toast.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Fastidious",
    "pronunciation": "fa-STID-ee-us",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Very attentive to details and standards, sometimes too much.",
    "usage": "He is fastidious about punctuation in public documents.",
    "etymology": "Latin - fastidium, disgust or squeamishness - English fastidious.",
    "example": "He is fastidious about punctuation in public documents.",
    "tags": [
      "care",
      "polished"
    ]
  },
  {
    "word": "Pithy",
    "pronunciation": "PITH-ee",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Short, forceful, and full of meaning.",
    "usage": "Her pithy reply ended the debate in one sentence.",
    "etymology": "Old English - pitha, plant pith - English pithy, full of substance.",
    "example": "Her pithy reply ended the debate in one sentence.",
    "tags": [
      "language",
      "polished"
    ]
  },
  {
    "word": "Equitable",
    "pronunciation": "EK-wi-tuh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Fair and reasonable to everyone involved.",
    "usage": "They tried to find an equitable solution for both teams.",
    "etymology": "Latin - aequus, equal or fair - English equitable.",
    "example": "They tried to find an equitable solution for both teams.",
    "tags": [
      "fairness",
      "polished"
    ]
  },
  {
    "word": "Prudent",
    "pronunciation": "PROO-dunt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Careful and sensible about future risk.",
    "usage": "It would be prudent to save a copy before editing.",
    "etymology": "Latin - providere, to foresee - English prudent.",
    "example": "It would be prudent to save a copy before editing.",
    "tags": [
      "care",
      "polished"
    ]
  },
  {
    "word": "Astounding",
    "pronunciation": "uh-STOWN-ding",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Very surprising or impressive.",
    "usage": "The speed of the recovery was astounding.",
    "etymology": "Old English - astunian, to stun - English astounding.",
    "example": "The speed of the recovery was astounding.",
    "tags": [
      "impact",
      "polished"
    ]
  },
  {
    "word": "Conversant",
    "pronunciation": "kun-VUR-sunt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Familiar with a subject through experience or study.",
    "usage": "She is conversant with the basics of contract law.",
    "etymology": "Latin - conversari, to live among or associate with - English conversant.",
    "example": "She is conversant with the basics of contract law.",
    "tags": [
      "knowledge",
      "polished"
    ]
  },
  {
    "word": "Magnanimous",
    "pronunciation": "mag-NAN-uh-mus",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Generous or forgiving, especially toward someone less powerful.",
    "usage": "It was magnanimous of her to praise her rival publicly.",
    "etymology": "Latin - magnus, great - animus, spirit - English magnanimous.",
    "example": "It was magnanimous of her to praise her rival publicly.",
    "tags": [
      "character",
      "polished"
    ]
  },
  {
    "word": "Impeccable",
    "pronunciation": "im-PEK-uh-buhl",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Without obvious fault; extremely well done.",
    "usage": "His timing was impeccable during the presentation.",
    "etymology": "Latin - in, not - peccare, to sin or err - English impeccable.",
    "example": "His timing was impeccable during the presentation.",
    "tags": [
      "quality",
      "polished"
    ]
  },
  {
    "word": "Prosaic",
    "pronunciation": "proh-ZAY-ik",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Ordinary or lacking imagination, but practical.",
    "usage": "The answer was prosaic, but it solved the problem.",
    "etymology": "Latin - prosa, straightforward speech - English prosaic.",
    "example": "The answer was prosaic, but it solved the problem.",
    "tags": [
      "style",
      "polished"
    ]
  },
  {
    "word": "Discreet",
    "pronunciation": "di-SKREET",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Careful and private in speech or behaviour.",
    "usage": "Please be discreet about the salary discussion.",
    "etymology": "Latin - discernere, to separate - French discret - English discreet.",
    "example": "Please be discreet about the salary discussion.",
    "tags": [
      "social",
      "polished"
    ]
  },
  {
    "word": "Adroit",
    "pronunciation": "uh-DROYT",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Skilful and clever, especially in handling situations.",
    "usage": "Her adroit handling of the complaint saved the relationship.",
    "etymology": "French - a droit, to the right or skilful - English adroit.",
    "example": "Her adroit handling of the complaint saved the relationship.",
    "tags": [
      "skill",
      "polished"
    ]
  },
  {
    "word": "Sanguine",
    "pronunciation": "SAN-gwin",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Optimistic, especially in a difficult situation.",
    "usage": "He remained sanguine even after the first plan failed.",
    "etymology": "Latin - sanguis, blood - old theory of temperaments - English sanguine.",
    "example": "He remained sanguine even after the first plan failed.",
    "tags": [
      "feeling",
      "polished"
    ]
  },
  {
    "word": "Temperate",
    "pronunciation": "TEM-puh-rit",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Moderate and controlled, not extreme.",
    "usage": "Her temperate reply lowered the tension in the room.",
    "etymology": "Latin - temperare, to moderate or mix properly - English temperate.",
    "example": "Her temperate reply lowered the tension in the room.",
    "tags": [
      "restraint",
      "polished"
    ]
  },
  {
    "word": "Erudite",
    "pronunciation": "ER-yoo-dyt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Having or showing deep knowledge.",
    "usage": "The speaker was erudite but never made the audience feel small.",
    "etymology": "Latin - erudire, to educate or polish - English erudite.",
    "example": "The speaker was erudite but never made the audience feel small.",
    "tags": [
      "knowledge",
      "polished"
    ]
  },
  {
    "word": "Sage",
    "pronunciation": "SAYJ",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Wise, especially from experience.",
    "usage": "Her sage advice was simple: wait before replying.",
    "etymology": "Latin - sapere, to be wise - Old French sage - English sage.",
    "example": "Her sage advice was simple: wait before replying.",
    "tags": [
      "wisdom",
      "polished"
    ]
  },
  {
    "word": "Adept",
    "pronunciation": "uh-DEPT",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Skilled at doing something.",
    "usage": "He is adept at turning vague ideas into practical steps.",
    "etymology": "Latin - adipisci, to attain - English adept.",
    "example": "He is adept at turning vague ideas into practical steps.",
    "tags": [
      "skill",
      "polished"
    ]
  },
  {
    "word": "Acerbic",
    "pronunciation": "uh-SUR-bik",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Sharp or biting in tone.",
    "usage": "Her acerbic comment was funny, but a little too harsh.",
    "etymology": "Latin - acerbus, sour or harsh - English acerbic.",
    "example": "Her acerbic comment was funny, but a little too harsh.",
    "tags": [
      "tone",
      "polished"
    ]
  },
  {
    "word": "Sober",
    "pronunciation": "SOH-bur",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Serious, sensible, and not exaggerated.",
    "usage": "We need a sober assessment of the risks.",
    "etymology": "Latin - sobrius, not drunk or moderate - English sober.",
    "example": "We need a sober assessment of the risks.",
    "tags": [
      "restraint",
      "polished"
    ]
  },
  {
    "word": "Keen",
    "pronunciation": "KEEN",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Sharp, eager, or strongly interested.",
    "usage": "She has a keen eye for small design problems.",
    "etymology": "Old English - cene, bold or brave - English keen, sharp or eager.",
    "example": "She has a keen eye for small design problems.",
    "tags": [
      "attention",
      "polished"
    ]
  },
  {
    "word": "Fervent",
    "pronunciation": "FUR-vunt",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Showing strong and sincere feeling.",
    "usage": "He made a fervent case for protecting the library.",
    "etymology": "Latin - fervere, to boil - English fervent.",
    "example": "He made a fervent case for protecting the library.",
    "tags": [
      "feeling",
      "polished"
    ]
  },
  {
    "word": "Deft",
    "pronunciation": "DEFT",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Skilful, quick, and neat.",
    "usage": "Her deft explanation made the process feel simple.",
    "etymology": "Old English - daefte, gentle or fitting - English deft.",
    "example": "Her deft explanation made the process feel simple.",
    "tags": [
      "skill",
      "polished"
    ]
  },
  {
    "word": "Solemn",
    "pronunciation": "SOL-um",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Serious and sincere.",
    "usage": "The room became solemn when the names were read aloud.",
    "etymology": "Latin - sollemnis, ceremonial or formal - English solemn.",
    "example": "The room became solemn when the names were read aloud.",
    "tags": [
      "tone",
      "polished"
    ]
  },
  {
    "word": "Kinetic",
    "pronunciation": "ki-NET-ik",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Related to movement or energy.",
    "usage": "The presentation felt kinetic, with ideas moving quickly from one to the next.",
    "etymology": "Greek - kinesis, movement - English kinetic.",
    "example": "The presentation felt kinetic, with ideas moving quickly from one to the next.",
    "tags": [
      "energy",
      "polished"
    ]
  },
  {
    "word": "Exacting",
    "pronunciation": "ig-ZAK-ting",
    "difficulty": "Polished",
    "tone": "polished",
    "description": "Demanding a lot of care, effort, or precision.",
    "usage": "The task was exacting, but the result was worth it.",
    "etymology": "Latin - exigere, to demand or measure out - English exacting.",
    "example": "The task was exacting, but the result was worth it.",
    "tags": [
      "care",
      "polished"
    ]
  }
];

const everydaySupplementalRecords = [{"word":"functional","pos":"adj","definition":"Useful; serving a purpose, fulfilling a function.","topic":"useful"},{"word":"serviceable","pos":"adj","definition":"In condition for use.","topic":"useful"},{"word":"utilizable","pos":"adj","definition":"Able to be utilized","topic":"useful"},{"word":"utilitarian","pos":"adj","definition":"Practical and functional, present for use, not just for show.","topic":"useful"},{"word":"usable","pos":"adj","definition":"Capable of being used.","topic":"useful"},{"word":"reusable","pos":"adj","definition":"Able to be used again; especially after salvaging or special treatment or processing","topic":"useful"},{"word":"practical","pos":"adj","definition":"Relating to, or based on, practice or action rather than theory or hypothesis.","topic":"useful"},{"word":"recyclable","pos":"adj","definition":"Able to be recycled.","topic":"useful"},{"word":"multipurpose","pos":"adj","definition":"Designed or intended to fit more than one type of function or application; having multiple uses.","topic":"useful"},{"word":"usefulness","pos":"n","definition":"The quality or degree of being useful.","topic":"useful"},{"word":"utility","pos":"n","definition":"The state or condition of being useful; usefulness.","topic":"useful"},{"word":"handy","pos":"adj","definition":"Easy to use, useful.","topic":"useful"},{"word":"available","pos":"adj","definition":"Readily obtainable.","topic":"useful"},{"word":"conducive","pos":"adj","definition":"Tending to contribute to, encourage, or bring about some result.","topic":"useful"},{"word":"effective","pos":"adj","definition":"Having the power to produce a required effect or effects.","topic":"useful"},{"word":"effectual","pos":"adj","definition":"Producing the intended result; entirely adequate.","topic":"useful"},{"word":"applicable","pos":"adj","definition":"Suitable for application, relevant.","topic":"useful"},{"word":"workable","pos":"adj","definition":"Capable of functioning.","topic":"useful"},{"word":"feasible","pos":"adj","definition":"Able to be done in practice.","topic":"useful"},{"word":"practicable","pos":"adj","definition":"Capable of being accomplished; feasible.","topic":"useful"},{"word":"actionable","pos":"adj","definition":"Able to be acted on; able to be used as the basis for taking action.","topic":"useful"},{"word":"suitable","pos":"adj","definition":"Having sufficient or the required properties for a certain purpose or task; appropriate to a certain occasion.","topic":"useful"},{"word":"expedient","pos":"adj","definition":"Suitable to effect some desired end or the purpose intended.","topic":"useful"},{"word":"supportive","pos":"adj","definition":"Providing support.","topic":"useful"},{"word":"contribution","pos":"n","definition":"Something given or offered that adds to a larger whole.","topic":"useful"},{"word":"appropriate","pos":"adj","definition":"Suitable or fit; proper; felicitous.","topic":"useful"},{"word":"benefit","pos":"n","definition":"An advantage; help or aid from something.","topic":"useful"},{"word":"convenient","pos":"adj","definition":"Serving to reduce a difficulty, or accessible with minimum difficulty; expedient.","topic":"useful"},{"word":"salutary","pos":"adj","definition":"Promoting good health and physical well-being; wholesome; curative.","topic":"useful"},{"word":"efficient","pos":"adj","definition":"Making good, thorough, or careful use of resources; not consuming extra. Especially, making good use of time or energy.","topic":"useful"},{"word":"opportune","pos":"adj","definition":"At a convenient or advantageous time.","topic":"useful"},{"word":"contribute","pos":"v","definition":"(ambitransitive) To give something that is or becomes part of a larger whole.","topic":"useful"},{"word":"advisable","pos":"adj","definition":"(of a course of action) Worthy of being recommended; desirable.","topic":"useful"},{"word":"adequate","pos":"adj","definition":"Equal to or fulfilling some requirement.","topic":"useful"},{"word":"resourceful","pos":"adj","definition":"Capable or clever; able to put available resources to efficient or ingenious use; using materials at hand wisely or efficiently.","topic":"useful"},{"word":"valid","pos":"adj","definition":"Acceptable, proper or correct; in accordance with the rules.","topic":"useful"},{"word":"good","pos":"adj","definition":"Of a person or an animal.","topic":"useful"},{"word":"purposive","pos":"adj","definition":"Serving a particular purpose; useful; adapted to a given purpose, especially through natural evolution.","topic":"useful"},{"word":"interesting","pos":"adj","definition":"Arousing or holding the attention or interest of someone.","topic":"useful"},{"word":"valued","pos":"adj","definition":"Having a value, esteemed.","topic":"useful"},{"word":"instrumental","pos":"adj","definition":"(music) Pertaining to, made by, or prepared for an instrument, especially a musical instrument (rather than the human voice).","topic":"useful"},{"word":"judicious","pos":"adj","definition":"Having, characterized by, or done with good judgment or sound thinking.","topic":"useful"},{"word":"reasonable","pos":"adj","definition":"Not excessive or immoderate; within due limits; proper.","topic":"useful"},{"word":"wise","pos":"adj","definition":"Showing good judgement or the benefit of experience.","topic":"useful"},{"word":"purposeful","pos":"adj","definition":"Having purpose: having intention or meaning; intentional.","topic":"useful"},{"word":"rational","pos":"adj","definition":"Capable of reasoning.","topic":"useful"},{"word":"timely","pos":"adj","definition":"Done at the proper time or within the proper time limits; prompt.","topic":"useful"},{"word":"preferable","pos":"adj","definition":"Better than some other option; preferred.","topic":"useful"},{"word":"remedy","pos":"n","definition":"A medicine, application, or treatment that relieves or cures a disease.","topic":"useful"},{"word":"used","pos":"adj","definition":"That is or has or have been used.","topic":"useful"},{"word":"necessary","pos":"adj","definition":"Required, essential, whether logically inescapable or needed in order to achieve a desired result or avoid some penalty.","topic":"useful"},{"word":"favorable","pos":"adj","definition":"US standard spelling of favourable. [Apt to win favour; pleasing.]","topic":"useful"},{"word":"powerful","pos":"adj","definition":"Having, or capable of exerting, power or influence.","topic":"useful"},{"word":"need","pos":"v","definition":"(transitive) To have an absolute requirement for.","topic":"useful"},{"word":"course","pos":"n","definition":"A sequence of events.","topic":"useful"},{"word":"needed","pos":"adj","definition":"Necessary; being required.","topic":"useful"},{"word":"exploitable","pos":"adj","definition":"Able to be exploited, especially commercially.","topic":"useful"},{"word":"sound","pos":"adj","definition":"(of sleep) Quiet and deep.","topic":"useful"},{"word":"duration","pos":"n","definition":"An amount of time or a particular time interval.","topic":"useful"},{"word":"healthy","pos":"adj","definition":"Enjoying good health; free from disease or disorder.","topic":"useful"},{"word":"fine","pos":"adj","definition":"Senses referring to subjective quality.","topic":"useful"},{"word":"expectancy","pos":"n","definition":"Expectation or anticipation; the state of expecting something.","topic":"useful"},{"word":"viable","pos":"adj","definition":"Able to be done, possible, practicable, feasible.","topic":"useful"},{"word":"right","pos":"adj","definition":"Complying with justice, correctness, or reason; correct, just, true. See also the interjection senses below.","topic":"useful"},{"word":"companion","pos":"n","definition":"A friend, acquaintance, or partner; someone with whom one spends time or accompanies","topic":"useful"},{"word":"sense","pos":"n","definition":"Any of the manners by which living beings perceive the physical world: for humans sight, smell, hearing, touch, taste.","topic":"useful"},{"word":"interest","pos":"n","definition":"(uncountable) A great attention and concern from someone or something; intellectual curiosity.","topic":"useful"},{"word":"gainful","pos":"adj","definition":"Providing gain; profitable.","topic":"useful"},{"word":"attachment","pos":"n","definition":"A strong bonding with or fondness for someone or something.","topic":"useful"},{"word":"stationery","pos":"adj","definition":"Misspelling of stationary. [Not moving.]","topic":"useful"},{"word":"invaluable","pos":"adj","definition":"Having great or incalculable value.","topic":"useful"},{"word":"futile","pos":"adj","definition":"Incapable of producing results, useless; doomed not to be successful; not worth attempting.","topic":"useful"},{"word":"pointless","pos":"adj","definition":"Having no purpose; purposeless; unable to effect an aim.","topic":"useful"},{"word":"useless","pos":"adj","definition":"Unhelpful, not useful; pointless (of an action).","topic":"useful"},{"word":"constructive","pos":"adj","definition":"Carefully considered and meant to be helpful.","topic":"useful"},{"word":"inadvisable","pos":"adj","definition":"Unwise; not recommended; not prudent; not to be advised.","topic":"useful"},{"word":"unnecessary","pos":"adj","definition":"Not needed or necessary.","topic":"useful"},{"word":"tool","pos":"n","definition":"Any physical device meant to ease or do a task.","topic":"useful"},{"word":"stain","pos":"n","definition":"A discolored spot or area caused by spillage or other contact with certain fluids or substances.","topic":"useful"},{"word":"cycle","pos":"n","definition":"A process that returns to its beginning and then repeats itself in the same sequence.","topic":"useful"},{"word":"productive","pos":"adj","definition":"Capable of producing something, especially in abundance; fertile.","topic":"useful"},{"word":"serve","pos":"v","definition":"(personal) To provide a service (or, by extension, a product, especially food or drink).","topic":"useful"},{"word":"expectancies","pos":"n","definition":"Expectation or anticipation; the state of expecting something.","topic":"useful"},{"word":"efficacious","pos":"adj","definition":"(formal) Effective; possessing efficacy.","topic":"useful"},{"word":"indispensable","pos":"adj","definition":"Absolutely necessary or requisite; that one cannot do without.","topic":"useful"},{"word":"indispensible","pos":"adj","definition":"Misspelling of indispensable. [Absolutely necessary or requisite; that one cannot do without.]","topic":"useful"},{"word":"neat","pos":"adj","definition":"Clean, tidy; free from dirt or impurities.","topic":"useful"},{"word":"crucial","pos":"adj","definition":"Essential or decisive for determining the outcome or future of something; extremely important; vital.","topic":"useful"},{"word":"problematic","pos":"adj","definition":"Posing a problem; having or suffering from problem(s).","topic":"useful"},{"word":"vital","pos":"adj","definition":"Necessary to the continuation of life; being the seat of life; being that on which life depends.","topic":"useful"},{"word":"problematical","pos":"adj","definition":"Dubious or ambiguous.","topic":"useful"},{"word":"difficult","pos":"adj","definition":"Hard, not easy, requiring much effort.","topic":"useful"},{"word":"clever","pos":"adj","definition":"Quick to understand, learn, and devise or apply ideas; intelligent.","topic":"useful"},{"word":"reliable","pos":"adj","definition":"Suitable or fit to be relied on; worthy of dependence, reliance or trust; dependable, trustworthy","topic":"useful"},{"word":"invaluably","pos":"adv","definition":"In an invaluable manner; inestimably.","topic":"useful"},{"word":"satisfying","pos":"adj","definition":"That satisfies, gratifies or pleases; that removes any feeling of lack.","topic":"useful"},{"word":"versatile","pos":"adj","definition":"Capable of doing many things competently.","topic":"useful"},{"word":"needful","pos":"adj","definition":"Needed; necessary; mandatory; requisite; indispensable.","topic":"useful"},{"word":"possible","pos":"adj","definition":"(comparable) Capable of being done or achieved; feasible.","topic":"useful"},{"word":"impractical","pos":"adj","definition":"Not practical; impracticable.","topic":"useful"},{"word":"inexpensive","pos":"adj","definition":"Involving little expense; reasonable in price; cheap.","topic":"useful"},{"word":"troublesome","pos":"adj","definition":"Causing trouble or anxiety.","topic":"useful"},{"word":"worthless","pos":"adj","definition":"Having no worth or use; without value.","topic":"useful"},{"word":"comprehensible","pos":"adj","definition":"Able to be comprehended.","topic":"useful"},{"word":"simple","pos":"adj","definition":"Uncomplicated; lacking complexity; taken by itself, with nothing added.","topic":"useful"},{"word":"sufficient","pos":"adj","definition":"Of a type or kind that suffices, that satisfies requirements or needs.","topic":"useful"},{"word":"valuably","pos":"adv","definition":"In a valuable way, or in a way that adds value","topic":"useful"},{"word":"tricky","pos":"adj","definition":"Hard to deal with, complicated.","topic":"useful"},{"word":"accessible","pos":"adj","definition":"Easy of access or approach.","topic":"useful"},{"word":"importantly","pos":"adv","definition":"(sentence adverb) Used to mark a statement as having importance.","topic":"useful"},{"word":"applicative","pos":"n","definition":"(grammar) A grammatical construct that casts a peripheral noun phrase as direct object.","topic":"useful"},{"word":"applied","pos":"adj","definition":"Put into practical use.","topic":"useful"},{"word":"applicatory","pos":"adj","definition":"able to be applied or used, practical","topic":"useful"},{"word":"commodious","pos":"adj","definition":"Spacious and convenient; roomy and comfortable.","topic":"useful"},{"word":"noteful","pos":"adj","definition":"Useful; serviceable.","topic":"useful"},{"word":"proficuous","pos":"adj","definition":"Useful or profitable.","topic":"useful"},{"word":"working","pos":"n","definition":"(usually in the plural) Operation; action.","topic":"useful"},{"word":"benefitable","pos":"adj","definition":"Able to bring benefit, able to be beneficial.","topic":"useful"},{"word":"advantageable","pos":"adj","definition":"Providing an advantage; helpful to the advancement of a cause.","topic":"useful"},{"word":"appliable","pos":"adj","definition":"Able to be put into use or applied; applicable.","topic":"useful"},{"word":"practible","pos":"adj","definition":"Able to be put into practice; feasible.","topic":"useful"},{"word":"improvable","pos":"adj","definition":"Capable of being improved.","topic":"useful"},{"word":"benefactory","pos":"n","definition":"One who gives benefit to others; a benefactor.","topic":"useful"},{"word":"developed","pos":"adj","definition":"(said of a country) wealthy and industrialized; not third-world.","topic":"useful"},{"word":"universal","pos":"n","definition":"(philosophy) A characteristic or property that particular things have in common.","topic":"useful"},{"word":"predictive","pos":"adj","definition":"Useful in predicting.","topic":"useful"},{"word":"comfortable","pos":"adj","definition":"Providing physical comfort and ease; agreeable.","topic":"useful"},{"word":"operative","pos":"adj","definition":"Functional, in working order.","topic":"useful"},{"word":"healthful","pos":"adj","definition":"Beneficial to bodily health.","topic":"useful"},{"word":"employable","pos":"adj","definition":"(especially of a person) Able to be employed.","topic":"useful"},{"word":"resultful","pos":"adj","definition":"Producing results or effects; resulting.","topic":"useful"},{"word":"pragmatic","pos":"adj","definition":"Practical, concerned with making decisions and actions that are useful in practice, not just theory.","topic":"useful"},{"word":"wieldy","pos":"adj","definition":"(chiefly in the negative) Capable of being easily wielded or managed; handy.","topic":"useful"},{"word":"operable","pos":"adj","definition":"Able to be operated or used.","topic":"useful"},{"word":"propitious","pos":"adj","definition":"Favorable; advantageous.","topic":"useful"},{"word":"employed","pos":"adj","definition":"In a job; working.","topic":"useful"},{"word":"helpable","pos":"adj","definition":"Capable of being helped.","topic":"useful"},{"word":"pointful","pos":"adj","definition":"Having a point; not pointless.","topic":"useful"},{"word":"benefic","pos":"n","definition":"(astrology) A favorable planet.","topic":"useful"},{"word":"ultrapractical","pos":"adj","definition":"Extremely practical.","topic":"useful"},{"word":"implemental","pos":"adj","definition":"Pertaining to, or characterized by, implements or their use; mechanical.","topic":"useful"},{"word":"wholesome","pos":"adj","definition":"Promoting good physical health and well-being.","topic":"useful"},{"word":"repurposable","pos":"adj","definition":"Able to be repurposed; having alternative potential uses or functions beyond the original.","topic":"useful"},{"word":"living","pos":"n","definition":"(uncountable) The state of being alive.","topic":"useful"},{"word":"habile","pos":"adj","definition":"Generally able or adroit; handy.","topic":"useful"},{"word":"gainsome","pos":"adj","definition":"Well-formed; handsome; gainly.","topic":"useful"},{"word":"apposite","pos":"adj","definition":"Strikingly appropriate or relevant; well suited to the circumstance or in relation to something.","topic":"useful"},{"word":"serendipitous","pos":"adj","definition":"by serendipity; by unexpected good fortune","topic":"useful"},{"word":"satisfactory","pos":"adj","definition":"Causing satisfaction; agreeable or pleasant; satisfying.","topic":"useful"},{"word":"vulnerary","pos":"n","definition":"A healing drug or other agent used in healing and treating wounds.","topic":"useful"},{"word":"furnishable","pos":"adj","definition":"Capable of being fitted with furniture.","topic":"useful"},{"word":"standard","pos":"n","definition":"A level of quality or attainment.","topic":"useful"},{"word":"proven","pos":"adj","definition":"Having been proved; having proved its value or truth.","topic":"useful"},{"word":"supportful","pos":"adj","definition":"Providing support; supportive.","topic":"useful"},{"word":"could","pos":"v","definition":"conditional of can","topic":"useful"},{"word":"avail","pos":"v","definition":"(transitive, often reflexive) To turn to the advantage of. [(chiefly) with of]","topic":"useful"},{"word":"fallow","pos":"n","definition":"(agriculture, uncountable) Ground ploughed and harrowed but left unseeded for one year.","topic":"useful"},{"word":"guidance","pos":"n","definition":"Advice or counselling on some topic.","topic":"useful"},{"word":"information","pos":"n","definition":"Things that are or can be known about a given topic; communicable knowledge of something.","topic":"useful"},{"word":"lessons","pos":"n","definition":"A section of learning or teaching into which a wider learning content is divided.","topic":"useful"},{"word":"links","pos":"n","definition":"A golf course, especially one situated on dunes by the sea.","topic":"useful"},{"word":"provide","pos":"v","definition":"To give what is needed or desired, especially basic needs.","topic":"useful"},{"word":"served","pos":"v","definition":"(personal) To provide a service (or, by extension, a product, especially food or drink).","topic":"useful"},{"word":"serving","pos":"n","definition":"(countable) The quantity of food or drink intended for one person in a single sitting; especially in relation to a meal.","topic":"useful"},{"word":"should","pos":"v","definition":"Ought to; indicating opinion, advice, or instruction, about what is required or desirable.","topic":"useful"},{"word":"source","pos":"n","definition":"The person, place, or thing from which something (information, goods, etc.) comes or is acquired.","topic":"useful"},{"word":"best","pos":"adj","definition":"Most superior; most favorable.","topic":"useful"},{"word":"inutile","pos":"adj","definition":"(Philippines) useless (of a person); inept.","topic":"useful"},{"word":"superannuated","pos":"adj","definition":"Retired or discarded due to age.","topic":"useful"},{"word":"acquisition","pos":"n","definition":"The act or process of acquiring.","topic":"useful"},{"word":"across","pos":"adv","definition":"From one side to the other.","topic":"useful"},{"word":"advice","pos":"n","definition":"(uncountable) An opinion offered to guide behavior in an effort to be helpful.","topic":"useful"},{"word":"aloe","pos":"n","definition":"Any plant of the large and variable genus Aloe.","topic":"useful"},{"word":"aloes","pos":"n","definition":"(plural only) The resin of the tree Aquilaria malaccensis (syn. Aquilaria agallocha), known for its fragrant odour.","topic":"useful"},{"word":"amenity","pos":"n","definition":"A thing or circumstance that is welcome and makes life a little easier or more pleasant.","topic":"useful"},{"word":"amino","pos":"n","definition":"(organic chemistry) An amino acid.","topic":"useful"},{"word":"antiquated","pos":"adj","definition":"old-fashioned, out of date","topic":"useful"},{"word":"apologue","pos":"n","definition":"A short story with a moral, often involving talking animals or objects; a fable.","topic":"useful"},{"word":"apply","pos":"v","definition":"(transitive) To put to use; to use or employ for a particular purpose, or in a particular case","topic":"useful"},{"word":"area","pos":"n","definition":"A particular geographic region.","topic":"useful"},{"word":"ashtray","pos":"n","definition":"A receptacle for ash and butts from cigarettes and cigars.","topic":"useful"},{"word":"athene","pos":"n","definition":"(Greek mythology) Athena","topic":"useful"},{"word":"back","pos":"adj","definition":"At or near the rear.","topic":"useful"},{"word":"bacteria","pos":"n","definition":"(US) A type, species, or strain of bacterium.","topic":"useful"},{"word":"barren","pos":"adj","definition":"(of places) Of poor fertility, infertile; not producing vegetation; desert, waste.","topic":"useful"},{"word":"bast","pos":"n","definition":"Inner bark of a tree from which rope is traditionally made.","topic":"useful"},{"word":"bonds","pos":"n","definition":"the condition of goods in a bonded warehouse until duty is paid","topic":"useful"},{"word":"boon","pos":"n","definition":"A good thing; a thing to be thankful for or to appreciate duly.","topic":"useful"},{"word":"bridge","pos":"n","definition":"A construction or natural feature that spans a divide.","topic":"useful"},{"word":"bugged","pos":"adj","definition":"(computing) Affected by a bug (computer error).","topic":"useful"},{"word":"bugging","pos":"n","definition":"Electronic surveillance.","topic":"useful"},{"word":"businesslike","pos":"adj","definition":"Methodical and efficient, in a way that would be advantageous to a business or businessperson.","topic":"useful"},{"word":"canny","pos":"adj","definition":"Knowing, shrewd, astute.","topic":"useful"},{"word":"carnauba","pos":"n","definition":"(uncountable) The hard wax obtained from the leaves of this plant and used especially in polishes.","topic":"useful"},{"word":"change","pos":"v","definition":"(intransitive) To become something different.","topic":"useful"},{"word":"chrestomathic","pos":"adj","definition":"(of teaching or learning) That has a practical use","topic":"useful"},{"word":"cobalt","pos":"n","definition":"A chemical element (symbol Co) with an atomic number of 27: a hard, lustrous, silver-gray metal.","topic":"useful"},{"word":"commercial","pos":"adj","definition":"Of or pertaining to commerce.","topic":"useful"},{"word":"commodity","pos":"n","definition":"(business) Anything movable (a good) that is bought and sold.","topic":"useful"},{"word":"compendium","pos":"n","definition":"A short, complete summary; an abstract.","topic":"useful"},{"word":"connections","pos":"n","definition":"People with whom one is acquainted who can offer help and influence.","topic":"useful"},{"word":"contact","pos":"n","definition":"The establishment of communication (with).","topic":"useful"},{"word":"contraption","pos":"n","definition":"A machine that is complicated and precarious.","topic":"useful"},{"word":"contrivance","pos":"n","definition":"A (mechanical) device to perform a certain task.","topic":"useful"},{"word":"convenience","pos":"n","definition":"The quality of being convenient.","topic":"useful"},{"word":"copper","pos":"n","definition":"(uncountable) A reddish-brown metal, symbol Cu, and atomic number 29.","topic":"useful"},{"word":"coyol","pos":"n","definition":"tropical american palm having edible nuts and yielding a useful fiber","topic":"useful"},{"word":"cybernetics","pos":"n","definition":"The theory/science of communication and control in living organisms or machines.","topic":"useful"},{"word":"dead","pos":"adj","definition":"(usually not comparable) No longer living; deceased. (Also used as a noun.)","topic":"useful"},{"word":"decorative","pos":"adj","definition":"That serves to decorate","topic":"useful"},{"word":"demand","pos":"n","definition":"The desire to purchase goods and services.","topic":"useful"},{"word":"demanding","pos":"adj","definition":"Making great demands in terms of quality, quantity, accuracy or other criteria; difficult to satisfy.","topic":"useful"},{"word":"deposit","pos":"n","definition":"(banking) Money placed in a bank account, as for safekeeping or to earn interest.","topic":"useful"},{"word":"depositional","pos":"adj","definition":"Of, pertaining to, or in the nature of a deposit or a deposition.","topic":"useful"},{"word":"diagnostic","pos":"adj","definition":"Of, or relating to diagnosis.","topic":"useful"},{"word":"diamond","pos":"n","definition":"A gemstone made from this mineral.","topic":"useful"},{"word":"directory","pos":"n","definition":"(computing) A structured listing of the names and characteristics of the files on a storage device.","topic":"useful"},{"word":"dropper","pos":"n","definition":"A utensil for dispensing a single drop of liquid at a time.","topic":"useful"},{"word":"durable","pos":"adj","definition":"Able to resist wear or decay; lasting; enduring.","topic":"useful"},{"word":"edit","pos":"v","definition":"To change a text, or a document.","topic":"useful"},{"word":"efficiency","pos":"n","definition":"The extent to which a resource is used for the intended purpose.","topic":"useful"},{"word":"elemi","pos":"n","definition":"(uncountable) A resin harvested from the tree.","topic":"useful"},{"word":"engine","pos":"n","definition":"The part of a car or other vehicle which provides the force for motion, now especially one powered by internal combustion.","topic":"useful"},{"word":"enrichment","pos":"n","definition":"The act of enriching or something enriched.","topic":"useful"},{"word":"equipage","pos":"n","definition":"(uncountable) Equipment or supplies, especially military ones.","topic":"useful"},{"word":"milestone","pos":"n","definition":"(idiomatic) An important event in a person's life or career, in the history of a nation, in the life of some project, etc.","topic":"useful"},{"word":"facilitatory","pos":"adj","definition":"That serves to facilitate.","topic":"helpful"},{"word":"accommodating","pos":"adj","definition":"Affording, or disposed to afford, accommodation; obliging; helpful.","topic":"helpful"},{"word":"attending","pos":"adj","definition":"That attend or attends; that is or are in attendance; attendant.","topic":"helpful"},{"word":"reformative","pos":"adj","definition":"That serves to reform or correct","topic":"helpful"},{"word":"reformatory","pos":"adj","definition":"Of, pertaining to, or conducive to reform; reformative.","topic":"helpful"},{"word":"steadying","pos":"adj","definition":"That steadies, stabilizes.","topic":"helpful"},{"word":"cooperative","pos":"adj","definition":"Ready to work with another person or in a team; ready to cooperate.","topic":"helpful"},{"word":"ministering","pos":"adj","definition":"Of one who, or something that, administers.","topic":"helpful"},{"word":"ministrant","pos":"adj","definition":"administering; attendant","topic":"helpful"},{"word":"laborsaving","pos":"adj","definition":"Alternative form of labor-saving. [Making work easier or faster.]","topic":"helpful"},{"word":"laboursaving","pos":"adj","definition":"Alternative form of labor-saving. [Making work easier or faster.]","topic":"helpful"},{"word":"stabilizing","pos":"adj","definition":"causing to become stable","topic":"helpful"},{"word":"facilitate","pos":"v","definition":"To make easy or easier.","topic":"helpful"},{"word":"comforting","pos":"adj","definition":"Giving comfort, especially in the sense of soothing distress.","topic":"helpful"},{"word":"contributed","pos":"v","definition":"(ambitransitive) To give something that is or becomes part of a larger whole.","topic":"helpful"},{"word":"contributing","pos":"v","definition":"(ambitransitive) To give something that is or becomes part of a larger whole.","topic":"helpful"},{"word":"considerate","pos":"adj","definition":"Consciously thoughtful and observant (often of other people and their rights, needs, feelings and comfort).","topic":"helpful"},{"word":"obliging","pos":"adj","definition":"Happy and ready to do favours for others.","topic":"helpful"},{"word":"contributive","pos":"adj","definition":"Tending to contribute; making a contribution","topic":"helpful"},{"word":"beneficent","pos":"adj","definition":"Given to acts that are kind, charitable, philanthropic or beneficial.","topic":"helpful"},{"word":"neighborly","pos":"adj","definition":"US standard spelling of neighbourly. [(British, Canada) Showing the qualities of a friendly and helpful neighbour.]","topic":"helpful"},{"word":"knowledgable","pos":"adj","definition":"(American spelling, rare) Alternative form of knowledgeable. [Having knowledge, especially of a particular subject.]","topic":"helpful"},{"word":"friendly","pos":"adj","definition":"Generally warm, approachable and easy to relate with in character.","topic":"helpful"},{"word":"knowledgeable","pos":"adj","definition":"Having knowledge, especially of a particular subject.","topic":"helpful"},{"word":"courteous","pos":"adj","definition":"Showing regard or thought for others; especially, displaying good manners or etiquette.","topic":"helpful"},{"word":"welcoming","pos":"adj","definition":"hospitable, accessible and cordial.","topic":"helpful"},{"word":"encouraging","pos":"adj","definition":"Giving courage, confidence or hope; auspicious.","topic":"helpful"},{"word":"approachable","pos":"adj","definition":"Easily approached; easy to talk to.","topic":"helpful"},{"word":"responsive","pos":"adj","definition":"Answering, replying or responding","topic":"helpful"},{"word":"attentive","pos":"adj","definition":"Paying attention; noticing, watching, listening, or attending closely.","topic":"helpful"},{"word":"amenable","pos":"adj","definition":"Willing to respond to persuasion or suggestions.","topic":"helpful"},{"word":"appreciated","pos":"adj","definition":"Recognized as having value.","topic":"helpful"},{"word":"hospitable","pos":"adj","definition":"cordial and generous towards guests","topic":"helpful"},{"word":"thorough","pos":"adj","definition":"Painstaking and careful not to miss or omit any detail.","topic":"helpful"},{"word":"kindly","pos":"adv","definition":"In a kind manner, out of kindness.","topic":"helpful"},{"word":"enthusiastic","pos":"adj","definition":"With zealous fervor; excited, motivated.","topic":"helpful"},{"word":"confusing","pos":"adj","definition":"difficult to understand; not clear as lacking order, chaotic, etc.","topic":"helpful"},{"word":"caring","pos":"adj","definition":"(of a person) Kind, sensitive, or empathetic.","topic":"helpful"},{"word":"discouraging","pos":"adj","definition":"That causes discouragement.","topic":"helpful"},{"word":"polite","pos":"adj","definition":"Well-mannered, civilized.","topic":"helpful"},{"word":"accomodating","pos":"adj","definition":"Misspelling of accommodating. [Affording, or disposed to afford, accommodation; obliging; helpful.]","topic":"helpful"},{"word":"quick","pos":"adj","definition":"Moving with speed, rapidity or swiftness, or capable of doing so; rapid; fast.","topic":"helpful"},{"word":"sympathetic","pos":"adj","definition":"Of, related to, feeling, showing, or characterized by sympathy.","topic":"helpful"},{"word":"furnished","pos":"adj","definition":"supplied with furniture","topic":"helpful"},{"word":"accommodative","pos":"adj","definition":"Supplying with or obliging; accommodating.","topic":"helpful"},{"word":"ministrative","pos":"adj","definition":"Serving to aid; ministering.","topic":"helpful"},{"word":"faciliatory","pos":"adj","definition":"Serving to facilitate.","topic":"helpful"},{"word":"helpworthy","pos":"adj","definition":"Deserving or worthy of help.","topic":"helpful"},{"word":"sustentive","pos":"adj","definition":"Serving to sustain.","topic":"helpful"},{"word":"endowed","pos":"adj","definition":"Provided or furnished with something.","topic":"helpful"},{"word":"fraught","pos":"n","definition":"(nautical) The transportation of goods, especially in a boat or ship.","topic":"helpful"},{"word":"companionly","pos":"adj","definition":"Befitting a companion.","topic":"helpful"},{"word":"nourishing","pos":"adj","definition":"That provides nourishment; nutritious.","topic":"helpful"},{"word":"suppliable","pos":"adj","definition":"Capable of being supplied.","topic":"helpful"},{"word":"armed","pos":"adj","definition":"(sometimes in combination) Equipped, especially with a weapon.","topic":"helpful"},{"word":"advisory","pos":"n","definition":"(countable) A warning.","topic":"helpful"},{"word":"provident","pos":"adj","definition":"Possessing, exercising, or demonstrating great care and consideration for the future.","topic":"helpful"},{"word":"teachable","pos":"adj","definition":"Capable of being taught; apt to learn.","topic":"helpful"},{"word":"healful","pos":"adj","definition":"Tending or serving to heal; health-promoting; healing.","topic":"helpful"},{"word":"amelioratory","pos":"adj","definition":"Serving to ameliorate or improve.","topic":"helpful"},{"word":"conducible","pos":"adj","definition":"(mathematics) Able to be decomposed into a direct sum of ideals, such that each ideal corresponds to a certain structure or property.","topic":"helpful"},{"word":"nutritive","pos":"adj","definition":"Nourishing, providing nutrition.","topic":"helpful"},{"word":"relieving","pos":"adj","definition":"That brings relief.","topic":"helpful"},{"word":"tributary","pos":"n","definition":"(hydrology) A natural water stream that flows into a larger river or other body of water.","topic":"helpful"},{"word":"comfortful","pos":"adj","definition":"Full of comforts; comfortable.","topic":"helpful"},{"word":"congratulatory","pos":"adj","definition":"Serving to congratulate.","topic":"helpful"},{"word":"furniturized","pos":"adj","definition":"(rare) Converted into furniture.","topic":"helpful"},{"word":"alimentative","pos":"adj","definition":"Nutritious, nourishing.","topic":"helpful"},{"word":"favorous","pos":"adj","definition":"favourable, favorable.","topic":"helpful"},{"word":"gratifying","pos":"adj","definition":"Pleasing, satisfying.","topic":"helpful"},{"word":"attestive","pos":"adj","definition":"Attesting; furnishing evidence.","topic":"helpful"},{"word":"equipaged","pos":"adj","definition":"Furnished with equipage.","topic":"helpful"},{"word":"auspicious","pos":"adj","definition":"Of good omen; indicating future success.","topic":"helpful"},{"word":"clarifying","pos":"adj","definition":"Providing clarity; making clear.","topic":"helpful"},{"word":"applianced","pos":"adj","definition":"(US, of a kitchen) Furnished with appliances","topic":"helpful"},{"word":"relaxing","pos":"adj","definition":"Conducive to relaxation; helping one to relax.","topic":"helpful"},{"word":"cabinetted","pos":"adj","definition":"Furnished with a cabinet or cabinets.","topic":"helpful"},{"word":"armchaired","pos":"adj","definition":"Based on general knowledge or theory rather than data.","topic":"helpful"},{"word":"congenial","pos":"adj","definition":"Friendly or sociable.","topic":"helpful"},{"word":"completory","pos":"adj","definition":"(logic) Serving to fulfil.","topic":"helpful"},{"word":"nutrient","pos":"n","definition":"A source of nourishment, such as food, that can be metabolized by an organism to give energy and build tissue.","topic":"helpful"},{"word":"augmentive","pos":"n","definition":"Something that augments.","topic":"helpful"},{"word":"leading","pos":"adj","definition":"Providing guidance or direction.","topic":"helpful"},{"word":"restful","pos":"adj","definition":"peaceful; having a peaceful aspect","topic":"helpful"},{"word":"consolidant","pos":"n","definition":"A substance applied to a material, such as rotten wood, to give it solidity and strength.","topic":"helpful"},{"word":"situated","pos":"adj","definition":"Located in a specific place.","topic":"helpful"},{"word":"aided","pos":"adj","definition":"having help; often used as a combining form","topic":"helpful"},{"word":"cooperate","pos":"v","definition":"(intransitive) To work or act together, especially for a common purpose or benefit.","topic":"helpful"},{"word":"doll","pos":"n","definition":"A small figure resembling a human being that is used as a toy.","topic":"helpful"},{"word":"more","pos":"adv","definition":"To a greater degree or extent.","topic":"helpful"},{"word":"support","pos":"v","definition":"(transitive) To help keep from falling.","topic":"helpful"},{"word":"abettor","pos":"n","definition":"One that abets an offender; one that incites; instigates; encourages.","topic":"helpful"},{"word":"accessorial","pos":"adj","definition":"Of or pertaining to an accessory, e.g. to a crime.","topic":"helpful"},{"word":"addition","pos":"n","definition":"(uncountable, arithmetic) The arithmetic operation of adding.","topic":"helpful"},{"word":"aidant","pos":"n","definition":"(rare) One who or that which aids; a helper.","topic":"helpful"},{"word":"allu","pos":"n","definition":"A surname from Telugu used by members of many families in Andhra Pradesh, India.","topic":"helpful"},{"word":"arrow","pos":"n","definition":"A projectile consisting of a shaft, a point and a tail with stabilizing fins that is shot from a bow.","topic":"helpful"},{"word":"avuncular","pos":"adj","definition":"In the manner of an uncle, pertaining to an uncle.","topic":"helpful"},{"word":"beneficence","pos":"n","definition":"Good or charitable character or behavior.","topic":"helpful"},{"word":"benevolent","pos":"adj","definition":"Having a disposition to do good.","topic":"helpful"},{"word":"brick","pos":"n","definition":"(countable) A hardened rectangular block of mud, clay etc., used for building.","topic":"helpful"},{"word":"brownie","pos":"n","definition":"(usually countable, baking, originally US) A small square piece of rich cake, usually made with chocolate.","topic":"helpful"},{"word":"clue","pos":"n","definition":"Information which may lead one to a certain point or conclusion.","topic":"helpful"},{"word":"damaging","pos":"adj","definition":"Causing damage; harmful, injurious.","topic":"helpful"},{"word":"delvers","pos":"n","definition":"One who digs or delves, as with a spade.","topic":"helpful"},{"word":"evidenced","pos":"adj","definition":"supported by evidence","topic":"helpful"},{"word":"forthcoming","pos":"adj","definition":"Willing to co-operate or provide information; candid, frank, responsive.","topic":"helpful"},{"word":"genie","pos":"n","definition":"(mythology) A fictional magical being that is typically bound to obey the commands of a mortal possessing its container.","topic":"helpful"},{"word":"grace","pos":"n","definition":"(countable, uncountable) Charming, pleasing qualities.","topic":"helpful"},{"word":"gracefulness","pos":"n","definition":"The state of being graceful.","topic":"helpful"},{"word":"graces","pos":"n","definition":"(Greek mythology) Three sister goddesses in Greek mythology (Euphrosyne, Aglaia, and Thalia), in whom beauty was deified.","topic":"helpful"},{"word":"grip","pos":"v","definition":"(transitive or intransitive) To take hold (of), particularly with the hand.","topic":"helpful"},{"word":"heloise","pos":"n","definition":"A female given name from French.","topic":"helpful"},{"word":"helpmate","pos":"n","definition":"A person who supplies help or companionship.","topic":"helpful"},{"word":"helpmeet","pos":"n","definition":"A helpful partner, particularly a spouse.","topic":"helpful"},{"word":"index","pos":"n","definition":"An alphabetical listing of items and their location.","topic":"helpful"},{"word":"jeeves","pos":"n","definition":"A fictional valet in the stories by P. G. Wodehouse.","topic":"helpful"},{"word":"kindliness","pos":"n","definition":"The state of feeling kindly towards someone or something, or the actions inspired thereby.","topic":"helpful"},{"word":"kindness","pos":"n","definition":"The state of being kind.","topic":"helpful"},{"word":"legend","pos":"n","definition":"A person of extraordinary fame or accomplishments.","topic":"helpful"},{"word":"lend","pos":"v","definition":"(transitive) To allow to be used by someone temporarily, on condition that it or its equivalent will be returned.","topic":"helpful"},{"word":"lifesaver","pos":"n","definition":"Someone or something that saves lives.","topic":"helpful"},{"word":"mantis","pos":"n","definition":"Any of various large insects of the order Mantodea that catch insects or other small animals with their powerful forelegs.","topic":"helpful"},{"word":"most","pos":"adv","definition":"Forms the superlative of many adjectives.","topic":"helpful"},{"word":"negative","pos":"adj","definition":"Not positive or neutral; bad; undesirable; unfavourable.","topic":"helpful"},{"word":"neighborliness","pos":"n","definition":"The characteristic of being neighborly.","topic":"helpful"},{"word":"neighbourly","pos":"adj","definition":"(British, Canada) Showing the qualities of a friendly and helpful neighbour.","topic":"helpful"},{"word":"please","pos":"adv","definition":"Used to make a polite request.","topic":"helpful"},{"word":"pointer","pos":"n","definition":"Anything that points or is used for pointing.","topic":"helpful"},{"word":"prediction","pos":"n","definition":"A statement of what will happen in the future.","topic":"helpful"},{"word":"prosperous","pos":"adj","definition":"Well off; affluent.","topic":"helpful"},{"word":"samaritan","pos":"n","definition":"A charitable person, one who helps others (from the Bible story in Luke 10:30–37).","topic":"helpful"},{"word":"second","pos":"adj","definition":"Number-two; following after the first one with nothing between them. The ordinal number corresponding to the cardinal number two.","topic":"helpful"},{"word":"seconds","pos":"n","definition":"A second helping of food for one person, or refill of coffee or other drink.","topic":"helpful"},{"word":"services","pos":"n","definition":"(business, economics) That which is produced, then traded, bought or sold, then finally consumed and consists of an action or work.","topic":"helpful"},{"word":"shtick","pos":"n","definition":"A generally humorous routine.","topic":"helpful"},{"word":"solid","pos":"adj","definition":"(of an object or substance) That can be picked up or held, having a texture, and usually firm. Unlike a liquid, gas or plasma.","topic":"helpful"},{"word":"subserve","pos":"v","definition":"To serve to promote (an end); to be useful to.","topic":"helpful"},{"word":"suggestion","pos":"n","definition":"(countable) Something suggested (with subsequent adposition being for)","topic":"helpful"},{"word":"tipped","pos":"adj","definition":"having a tip; or having a tip as specified (used in combination)","topic":"helpful"},{"word":"undo","pos":"v","definition":"To reverse the effects of an action.","topic":"helpful"},{"word":"unhelpfulness","pos":"n","definition":"The state of being unhelpful.","topic":"helpful"},{"word":"valet","pos":"n","definition":"A hotel employee performing such duties for guests.","topic":"helpful"},{"word":"beneficially","pos":"adv","definition":"In a beneficial manner","topic":"helpful"},{"word":"charity","pos":"n","definition":"(uncountable) Benevolence to others less fortunate than ourselves; the providing of goods or money to those in need.","topic":"helpful"},{"word":"aristotelian","pos":"adj","definition":"Of, pertaining to, or advocating the philosophical or logical theories of Aristotle.","topic":"helpful"},{"word":"avenger","pos":"n","definition":"One who takes vengeance.","topic":"helpful"},{"word":"basic","pos":"adj","definition":"Elementary, simple, fundamental, merely functional.","topic":"helpful"},{"word":"beautiful","pos":"adj","definition":"Possessing beauty, impressing the eye; attractive.","topic":"helpful"},{"word":"bedsteads","pos":"n","definition":"The framework that supports a bed; the rigid structural components of a bed, excluding the mattress, box spring, etc; bedframe.","topic":"helpful"},{"word":"burglars","pos":"n","definition":"A person who breaks in to premises with the intent of committing theft.","topic":"helpful"},{"word":"candid","pos":"adj","definition":"Straightforward, open and sincere.","topic":"helpful"},{"word":"citadels","pos":"n","definition":"A strong fortress that sits high above a city.","topic":"helpful"},{"word":"clarifications","pos":"n","definition":"The act of freeing from obscurities; disambiguation.","topic":"helpful"},{"word":"cockles","pos":"n","definition":"Any of various edible European bivalve mollusks, of the family Cardiidae, having heart-shaped shells.","topic":"helpful"},{"word":"cogent","pos":"adj","definition":"Reasonable and convincing; based on evidence.","topic":"helpful"},{"word":"common","pos":"adj","definition":"Occurring or happening regularly or frequently; usual.","topic":"helpful"},{"word":"concise","pos":"adj","definition":"Brief, yet including all important information.","topic":"helpful"},{"word":"critical","pos":"adj","definition":"Extremely important.","topic":"helpful"},{"word":"dependant","pos":"n","definition":"UK and Commonwealth standard spelling of dependent.","topic":"helpful"},{"word":"detrimental","pos":"adj","definition":"Causing damage or harm.","topic":"helpful"},{"word":"injurious","pos":"adj","definition":"Causing physical harm or injury; harmful, hurtful.","topic":"helpful"},{"word":"harmful","pos":"adj","definition":"Causing or likely to cause harm or damage; injurious.","topic":"helpful"},{"word":"pellucid","pos":"adj","definition":"(figuratively) Easily understood; clear.","topic":"clear"},{"word":"limpid","pos":"adj","definition":"Clear, transparent or bright.","topic":"clear"},{"word":"illuminate","pos":"adj","definition":"(figurative) Enlightened spiritually, divinely taught or inspired; in technical use, converted, baptized.","topic":"clear"},{"word":"enlighten","pos":"v","definition":"(transitive, figurative) To make something clear to (someone); to give knowledge or understanding to.","topic":"clear"},{"word":"brighten","pos":"v","definition":"(transitive, figuratively) To make more cheerful and pleasant; to enliven","topic":"clear"},{"word":"lucid","pos":"adj","definition":"Clear; easily understood.","topic":"clear"},{"word":"clarify","pos":"v","definition":"(by extension) To make or become clear or easily understood; to explain or resolve in order to remove doubt or obscurity.","topic":"clear"},{"word":"sunshiny","pos":"adj","definition":"(figurative) Cheerful; happy; pleasant.","topic":"clear"},{"word":"perspicuous","pos":"adj","definition":"Clearly expressed, easy to understand; lucid.","topic":"clear"},{"word":"broad","pos":"adj","definition":"Wide in extent or scope.","topic":"clear"},{"word":"clearheaded","pos":"adj","definition":"Having the ability to think clearly and act appropriately","topic":"clear"},{"word":"percipient","pos":"adj","definition":"Having the ability to perceive, especially to perceive quickly.","topic":"clear"},{"word":"open","pos":"adj","definition":"(usually not comparable) Physically unobstructed, uncovered, etc.","topic":"clear"},{"word":"discerning","pos":"adj","definition":"Of keen insight or selective judgement; perceptive.","topic":"clear"},{"word":"vivid","pos":"adj","definition":"(of an image or color) Bright, intense, or colourful.","topic":"clear"},{"word":"make","pos":"v","definition":"(transitive) To create.","topic":"clear"},{"word":"distinct","pos":"adj","definition":"Different from one another (with the preferable adposition being \"from\").","topic":"clear"},{"word":"legible","pos":"adj","definition":"Clear enough to be read; readable, particularly of handwriting.","topic":"clear"},{"word":"decipherable","pos":"adj","definition":"that can be deciphered, understood or comprehended","topic":"clear"},{"word":"unclutter","pos":"v","definition":"(transitive) To eliminate clutter from.","topic":"clear"},{"word":"trenchant","pos":"adj","definition":"(figuratively) Keen; biting; vigorously articulate and effective; severe.","topic":"clear"},{"word":"fair","pos":"adj","definition":"Unblemished (figuratively or literally); clean and pure; innocent.","topic":"clear"},{"word":"clearly","pos":"adv","definition":"(modal) Without a doubt; obviously.","topic":"clear"},{"word":"discharge","pos":"v","definition":"To free of a debt, claim, obligation, responsibility, accusation, etc.; to absolve; to acquit; to forgive; to clear.","topic":"clear"},{"word":"earn","pos":"v","definition":"(transitive) To gain (success, reward, recognition) through applied effort or work.","topic":"clear"},{"word":"authorize","pos":"v","definition":"(transitive) To grant (someone) the permission or power necessary to do (something); to permit; to sanction or consent to.","topic":"clear"},{"word":"crystallize","pos":"v","definition":"(transitive) To give a definite or precise form to (something).","topic":"clear"},{"word":"crystalline","pos":"adj","definition":"Of, relating to, or composed of crystals.","topic":"clear"},{"word":"exculpate","pos":"v","definition":"To clear of or to free from guilt; exonerate.","topic":"clear"},{"word":"exonerated","pos":"adj","definition":"Freed from any question of guilt, acquitted.","topic":"clear"},{"word":"acquit","pos":"v","definition":"(transitive) To declare or find innocent or not guilty.","topic":"clear"},{"word":"vindicated","pos":"adj","definition":"justified, avenged or cleared of blame","topic":"clear"},{"word":"unqualified","pos":"adj","definition":"Not qualified: ineligible; unfit for a position or task.","topic":"clear"},{"word":"unmistakable","pos":"adj","definition":"Unique, such that it cannot be mistaken for something else.","topic":"clear"},{"word":"clean","pos":"adj","definition":"Free of dirt, filth, or impurities (extraneous matter); not dirty, filthy, or soiled.","topic":"clear"},{"word":"untroubled","pos":"adj","definition":"Without worries; free from care.","topic":"clear"},{"word":"unencumbered","pos":"adj","definition":"Not burdened with worries, cares or responsibilities.","topic":"clear"},{"word":"pure","pos":"adj","definition":"Free of flaws or imperfections; unsullied.","topic":"clear"},{"word":"innocent","pos":"adj","definition":"Free from guilt, sin, or immorality.","topic":"clear"},{"word":"unsubtle","pos":"adj","definition":"Not subtle; obvious.","topic":"clear"},{"word":"unblemished","pos":"adj","definition":"Lacking blemishes; faultless.","topic":"clear"},{"word":"guiltless","pos":"adj","definition":"Free from guilt; innocent.","topic":"clear"},{"word":"unmortgaged","pos":"adj","definition":"Not subject to a mortgage.","topic":"clear"},{"word":"free","pos":"adj","definition":"(social) Unconstrained.","topic":"clear"},{"word":"cloudless","pos":"adj","definition":"Without any clouds.","topic":"clear"},{"word":"absolved","pos":"adj","definition":"That has been cleared from a sin or an offence.","topic":"clear"},{"word":"exculpated","pos":"adj","definition":"freed from any question of guilt","topic":"clear"},{"word":"transparently","pos":"adv","definition":"In a transparent manner; with nothing hidden.","topic":"clear"},{"word":"plain","pos":"adj","definition":"Simple, unaltered.","topic":"clear"},{"word":"clarification","pos":"n","definition":"The act of freeing from obscurities; disambiguation.","topic":"clear"},{"word":"clarity","pos":"n","definition":"The state or measure of being clear, either in appearance, thought or style; lucidity.","topic":"clear"},{"word":"tangible","pos":"adj","definition":"Touchable; able to be touched or felt; perceptible by the sense of touch.","topic":"clear"}];
const polishedSupplementalRecords = [{"word":"shrewd","pos":"adj","definition":"Showing clever resourcefulness in practical matters.","topic":"astute"},{"word":"smart","pos":"adj","definition":"Exhibiting social ability or cleverness.","topic":"astute"},{"word":"sharp","pos":"adj","definition":"Terminating in a point or edge, especially one that can cut or pierce easily; not dull, obtuse, or rounded.","topic":"astute"},{"word":"incisive","pos":"adj","definition":"Intelligently analytical and concise. (of a person or mental process)","topic":"astute"},{"word":"ingenious","pos":"adj","definition":"Of a person, displaying genius or brilliance; inventive.","topic":"astute"},{"word":"intelligent","pos":"adj","definition":"Of high or especially quick cognitive capacity, bright.","topic":"astute"},{"word":"sensitive","pos":"adj","definition":"(of a person) Easily offended, upset, or hurt.","topic":"astute"},{"word":"witty","pos":"adj","definition":"Clever; amusingly ingenious.","topic":"astute"},{"word":"perceptive","pos":"adj","definition":"Having or showing keenness or sharpness of perception, insight, understanding, or intuition.","topic":"astute"},{"word":"circumspect","pos":"adj","definition":"Carefully aware of all circumstances; considerate of all that is pertinent.","topic":"astute"},{"word":"artful","pos":"adj","definition":"Characterized by, or performed with, cleverness or contrivance; clever, ingenious.","topic":"astute"},{"word":"prudent","pos":"adj","definition":"Practically wise, judicious, shrewd.","topic":"astute"},{"word":"sophisticated","pos":"adj","definition":"Of a person: having obtained worldly experience, and lacking naiveté; cosmopolitan, worldly-wise.","topic":"astute"},{"word":"subtle","pos":"adj","definition":"Senses relating to tangible things.","topic":"astute"},{"word":"knowing","pos":"adj","definition":"Possessing knowledge or understanding; knowledgeable, intelligent.","topic":"astute"},{"word":"visionary","pos":"adj","definition":"Having vision or foresight.","topic":"astute"},{"word":"able","pos":"adj","definition":"Having the necessary powers or the needed resources to accomplish a task.","topic":"astute"},{"word":"intuitive","pos":"adj","definition":"Easily understood or grasped by intuition.","topic":"astute"},{"word":"penetrating","pos":"adj","definition":"Looking deeply into; piercing","topic":"astute"},{"word":"acute","pos":"adj","definition":"Intense; sensitive; sharp.","topic":"astute"},{"word":"sagacious","pos":"adj","definition":"Having or showing keen discernment, sound judgment, and farsightedness; mentally shrewd.","topic":"astute"},{"word":"alert","pos":"adj","definition":"Attentive; awake; on guard.","topic":"astute"},{"word":"perspicacious","pos":"adj","definition":"(figuratively) Of acute discernment; having keen insight; mentally perceptive.","topic":"astute"},{"word":"quickhanded","pos":"adj","definition":"Alternative form of quick-handed. [Quick and dextrous.]","topic":"astute"},{"word":"cleanly","pos":"adj","definition":"Being habitually clean, practising good hygiene.","topic":"astute"},{"word":"deliberate","pos":"adj","definition":"Done on purpose; intentional.","topic":"astute"},{"word":"differentiated","pos":"adj","definition":"(biology, of a cell or tissue) That has taken on a specialized form and function.","topic":"astute"},{"word":"surgical","pos":"adj","definition":"Of, relating to, used in, or resulting from surgery.","topic":"astute"},{"word":"circumspective","pos":"adj","definition":"Looking around in all directions; cautious or watchful of danger.","topic":"astute"},{"word":"scrupulous","pos":"adj","definition":"Exactly and carefully conducted.","topic":"astute"},{"word":"succinct","pos":"adj","definition":"Brief and to the point.","topic":"astute"},{"word":"accurate","pos":"adj","definition":"Telling the truth or giving a true result; exact; not defective or faulty.","topic":"astute"},{"word":"forthright","pos":"adj","definition":"Straightforward; not evasive; candid and direct.","topic":"astute"},{"word":"measured","pos":"adj","definition":"That has been determined by measurement.","topic":"astute"},{"word":"handpicked","pos":"adj","definition":"Picked by hand rather than by machinery.","topic":"astute"},{"word":"tight","pos":"adj","definition":"Firmly held together; compact; not loose or open.","topic":"astute"},{"word":"forehanded","pos":"adj","definition":"(now US) Looking to the future; displaying foresight; prudent.","topic":"astute"},{"word":"acicularly","pos":"adj","definition":"In an acicular way.","topic":"astute"},{"word":"considered","pos":"adj","definition":"Having been carefully thought out; maturely reflected upon.","topic":"astute"},{"word":"microscopic","pos":"adj","definition":"So small that it can only be seen with the aid of a microscope.","topic":"astute"},{"word":"studied","pos":"adj","definition":"Practiced; self-conscious; careful; not spontaneous.","topic":"astute"},{"word":"asquint","pos":"adv","definition":"With narrowed eyes.","topic":"astute"},{"word":"concientious","pos":"adj","definition":"Misspelling of conscientious. [Thorough, careful, or vigilant in one’s task performance; painstaking.]","topic":"astute"},{"word":"afterwise","pos":"adj","definition":"Wise after the fact.","topic":"astute"},{"word":"marksmanly","pos":"adj","definition":"Befitting a marksman.","topic":"astute"},{"word":"truthful","pos":"adj","definition":"Honest, and always telling the truth.","topic":"astute"},{"word":"instant","pos":"n","definition":"A very short period of time; a moment.","topic":"astute"},{"word":"askance","pos":"adv","definition":"(of a look or glance) With disapproval, skepticism, or suspicion.","topic":"astute"},{"word":"calculated","pos":"adj","definition":"Carefully thought out or planned.","topic":"astute"},{"word":"just","pos":"adv","definition":"Only, simply, merely.","topic":"astute"},{"word":"painstaking","pos":"adj","definition":"Carefully attentive to details; studious; diligent in performing a process or procedure.","topic":"astute"},{"word":"downright","pos":"adj","definition":"(figurative) Absolute, complete.","topic":"astute"},{"word":"calculating","pos":"adj","definition":"(not comparable) Having the ability to calculate.","topic":"astute"},{"word":"terse","pos":"adj","definition":"(by extension) Of speech or style: brief, concise, to the point.","topic":"astute"},{"word":"solicitous","pos":"adj","definition":"(Usually followed by about, for, etc., or a clause) Showing care, concern, or attention, in any of several ways; thus.","topic":"astute"},{"word":"typical","pos":"adj","definition":"Normal, average; to be expected.","topic":"astute"},{"word":"slow","pos":"adj","definition":"Taking a long time to move or go a short distance, or to perform an action; not quick in motion; proceeding at a low speed.","topic":"astute"},{"word":"observant","pos":"adj","definition":"Alert and paying close attention; watchful.","topic":"astute"},{"word":"pernicious","pos":"adj","definition":"Causing much harm in a subtle way.","topic":"astute"},{"word":"affabrous","pos":"adj","definition":"(rare, poetic) Executed in a workmanlike manner; ingeniously made.","topic":"astute"},{"word":"focused","pos":"adj","definition":"Directing all one's efforts towards achieving a particular goal.","topic":"astute"},{"word":"bladewise","pos":"adj","definition":"In the manner of a blade.","topic":"astute"},{"word":"worldwise","pos":"adj","definition":"Knowledgeable about the world; worldly-wise; sophisticated; experienced.","topic":"astute"},{"word":"sardonic","pos":"adj","definition":"Scornfully mocking or cynical.","topic":"astute"},{"word":"insiderly","pos":"adj","definition":"Characteristic of insiders.","topic":"astute"},{"word":"pauciloquent","pos":"adj","definition":"Using few words when speaking.","topic":"astute"},{"word":"tempered","pos":"adj","definition":"(in combination) Having a specified disposition or temper.","topic":"astute"},{"word":"opportunistic","pos":"adj","definition":"Taking advantage of situations that arise.","topic":"astute"},{"word":"underhanded","pos":"adj","definition":"Sly, dishonest, corrupt, cheating.","topic":"astute"},{"word":"roughdrawn","pos":"adj","definition":"Drawn or delineated rapidly and by way of a first sketch.","topic":"astute"},{"word":"unsudden","pos":"adj","definition":"Happening slowly and with plenty of warning; not sudden.","topic":"astute"},{"word":"furtive","pos":"adj","definition":"Of a thing: done with evasive or guilty secrecy.","topic":"astute"},{"word":"sidelong","pos":"adj","definition":"Directed to the side; sideways.","topic":"astute"},{"word":"offhand","pos":"adj","definition":"Careless; without sufficient thought or consideration.","topic":"astute"},{"word":"guardianly","pos":"adj","definition":"Befitting a guardian.","topic":"astute"},{"word":"studious","pos":"adj","definition":"Dedicated to study; devoted to the acquisition of knowledge from books","topic":"astute"},{"word":"superior","pos":"adj","definition":"Higher in rank, status, or quality.","topic":"astute"},{"word":"skeptimistic","pos":"adj","definition":"Both skeptical and optimistic at once.","topic":"astute"},{"word":"owly","pos":"adj","definition":"Resembling or characteristic of an owl.","topic":"astute"},{"word":"hyperelegant","pos":"adj","definition":"Extremely elegant.","topic":"astute"},{"word":"cometwise","pos":"adj","definition":"In the manner of a comet.","topic":"astute"},{"word":"rhadamanthine","pos":"adj","definition":"Strictly and uncompromisingly just.","topic":"astute"},{"word":"direct","pos":"adj","definition":"Proceeding without deviation or interruption.","topic":"astute"},{"word":"acuminulate","pos":"adj","definition":"(rare) Somewhat or slightly acuminate.","topic":"astute"},{"word":"abstemious","pos":"adj","definition":"Refraining from freely consuming food or strong drink; sparing in diet; abstinent, temperate.","topic":"astute"},{"word":"directed","pos":"adj","definition":"In a manner emphasizing one's point of view.","topic":"astute"},{"word":"minutely","pos":"adv","definition":"With attention to tiny details.","topic":"astute"},{"word":"extemporaneous","pos":"adj","definition":"With inadequate preparation or without advance thought; offhand.","topic":"astute"},{"word":"agnorant","pos":"adj","definition":"Simultaneously ignorant and arrogant.","topic":"astute"},{"word":"waywise","pos":"adj","definition":"Alternative form of way-wise. [Expert or knowledgeable in finding or keeping the way; knowing the way or route.]","topic":"astute"},{"word":"seriatim","pos":"adv","definition":"One after another, in order; taking one topic or subject at a time in an order; sequentially.","topic":"astute"},{"word":"upfront","pos":"adj","definition":"Honest, frank and straightforward.","topic":"astute"},{"word":"waterwise","pos":"adj","definition":"Making judicious use of the available water resources.","topic":"astute"},{"word":"crabwise","pos":"adv","definition":"In the manner of a crab; sideways.","topic":"astute"},{"word":"planful","pos":"adj","definition":"Having (many) plans.","topic":"astute"},{"word":"magicianly","pos":"adj","definition":"Like or befitting a magician.","topic":"astute"},{"word":"cold","pos":"n","definition":"(uncountable) A condition of low temperature.","topic":"astute"},{"word":"frank","pos":"n","definition":"(uncountable) Free postage, a right exercised by governments (usually with definite article).","topic":"astute"},{"word":"slanted","pos":"adj","definition":"Placed at an angle, on a slant.","topic":"astute"},{"word":"ostensive","pos":"adj","definition":"Clearly demonstrative.","topic":"astute"},{"word":"headmasterly","pos":"adj","definition":"Befitting a headmaster.","topic":"astute"},{"word":"ambiloquent","pos":"adj","definition":"(rare) Speaking ambiguously.","topic":"astute"},{"word":"rushed","pos":"adj","definition":"Done in haste; done quickly or hastily.","topic":"astute"},{"word":"timewise","pos":"adv","definition":"With respect to time.","topic":"astute"},{"word":"directorly","pos":"adj","definition":"Characteristic of a director.","topic":"astute"},{"word":"clerkly","pos":"adj","definition":"Of clerks; befitting a clerk.","topic":"astute"},{"word":"sequacious","pos":"adj","definition":"(Of people) Likely to follow, conform, or yield to others, especially showing unthinking adherence to others' ideas; easily led.","topic":"astute"},{"word":"remote","pos":"adj","definition":"At a distance; disconnected.","topic":"astute"},{"word":"expedited","pos":"adj","definition":"Arranged, executed or dispatched quickly or more efficiently.","topic":"astute"},{"word":"biased","pos":"adj","definition":"Exhibiting bias; prejudiced.","topic":"astute"},{"word":"untimely","pos":"adj","definition":"At an inopportune time.","topic":"astute"},{"word":"steply","pos":"adv","definition":"Step by step; gradually; in steps; stepwise.","topic":"astute"},{"word":"astucious","pos":"adj","definition":"having insight or acumen; perceptive; shrewd","topic":"astute"},{"word":"sage","pos":"n","definition":"The plant Salvia officinalis and savory spice produced from it; also planted for ornamental purposes.","topic":"astute"},{"word":"wily","pos":"adj","definition":"Sly, cunning, full of tricks.","topic":"astute"},{"word":"dense","pos":"adj","definition":"Having relatively high density.","topic":"astute"},{"word":"obtuse","pos":"adj","definition":"Intellectually dull or dim-witted.","topic":"astute"},{"word":"perspicacity","pos":"n","definition":"Acute discernment or understanding; insight.","topic":"astute"},{"word":"shrewdness","pos":"n","definition":"The quality of being shrewd.","topic":"astute"},{"word":"argute","pos":"adj","definition":"(literary) Sharp; perceptive; shrewd.","topic":"astute"},{"word":"judgment","pos":"n","definition":"The conclusion or result of judging; an opinion; a decision.","topic":"astute"},{"word":"poignant","pos":"adj","definition":"Evoking strong mental sensation, to the point of distress; emotionally moving.","topic":"astute"},{"word":"sagacity","pos":"n","definition":"The quality of being sage, wise, or able to make good decisions; the quality of being perceptive, astute or insightful.","topic":"astute"},{"word":"wide","pos":"adj","definition":"Having a large physical extent from side to side.","topic":"astute"},{"word":"acrimony","pos":"n","definition":"A sharp and bitter hatred.","topic":"astute"},{"word":"acumen","pos":"n","definition":"Quickness of perception or discernment; penetration of mind; the faculty of nice discrimination; acuity of mind.","topic":"astute"},{"word":"antenna","pos":"n","definition":"An apparatus to receive or transmit electromagnetic waves and convert respectively to or from an electrical signal.","topic":"astute"},{"word":"astucity","pos":"n","definition":"Craftiness; astuteness.","topic":"astute"},{"word":"guile","pos":"n","definition":"(uncountable) Astuteness often marked by a certain sense of cunning or artful deception.","topic":"astute"},{"word":"keenness","pos":"n","definition":"eagerness or enthusiasm","topic":"astute"},{"word":"shrewdly","pos":"adv","definition":"In a shrewd manner.","topic":"astute"},{"word":"adhering","pos":"v","definition":"(intransitive) To stick fast or cleave, as a glutinous substance does; to become joined or united.","topic":"astute"},{"word":"advanced","pos":"adj","definition":"At or close to the state of the art.","topic":"astute"},{"word":"approximate","pos":"adj","definition":"Nearing correctness; nearly exact; not perfectly accurate.","topic":"astute"},{"word":"ascendant","pos":"adj","definition":"Moving upward; ascending, rising.","topic":"astute"},{"word":"authoritative","pos":"adj","definition":"Highly accurate or definitive; treated or worthy of treatment as a scholarly authority.","topic":"astute"},{"word":"boyish","pos":"adj","definition":"Like a stereotypical boy in appearance or demeanor.","topic":"astute"},{"word":"briefly","pos":"adv","definition":"(manner) In a brief manner, summarily.","topic":"astute"},{"word":"burnt","pos":"adj","definition":"Damaged or injured by fire or heat.","topic":"astute"},{"word":"bushels","pos":"n","definition":"A vessel of the capacity of a bushel, used in measuring; a bushel measure.","topic":"astute"},{"word":"confess","pos":"v","definition":"(intransitive, transitive) To admit to the truth, particularly in the context of sins or crimes committed.","topic":"astute"},{"word":"doltish","pos":"adj","definition":"Like a dolt; dull in intellect; stupid.","topic":"astute"},{"word":"farsighted","pos":"adj","definition":"Considering the future with respect to one's own plans or deeds; showing anticipation.","topic":"astute"},{"word":"gallant","pos":"adj","definition":"Brave, valiant, courteous, especially with regard to male attitudes towards women.","topic":"astute"},{"word":"informed","pos":"adj","definition":"Instructed; having knowledge of a fact or area of education.","topic":"astute"},{"word":"shrewder","pos":"adj","definition":"Showing clever resourcefulness in practical matters.","topic":"astute"},{"word":"shrewdest","pos":"adj","definition":"Showing clever resourcefulness in practical matters.","topic":"astute"},{"word":"sighted","pos":"adj","definition":"Having vision, not blind.","topic":"astute"},{"word":"stupid","pos":"adj","definition":"Without intelligence.","topic":"astute"},{"word":"victorious","pos":"adj","definition":"Being the winner in a contest, struggle, war, etc.","topic":"astute"},{"word":"facile","pos":"adj","definition":"(now usually derogatory) Easy; contemptibly easy.","topic":"eloquent"},{"word":"fluent","pos":"adj","definition":"Able to use a language accurately, rapidly, and confidently.","topic":"eloquent"},{"word":"vocal","pos":"adj","definition":"Of, pertaining to, or resembling the human voice or speech.","topic":"eloquent"},{"word":"dramatic","pos":"adj","definition":"Of or relating to the drama.","topic":"eloquent"},{"word":"prime","pos":"adj","definition":"First in importance, degree, or rank.","topic":"eloquent"},{"word":"persuasive","pos":"adj","definition":"Able to persuade; convincing.","topic":"eloquent"},{"word":"convincing","pos":"adj","definition":"Effective as proof or evidence.","topic":"eloquent"},{"word":"telling","pos":"adj","definition":"Revealing information; bearing significance.","topic":"eloquent"},{"word":"outspoken","pos":"adj","definition":"Speaking, or spoken, freely, openly, or boldly; vocal; frank.","topic":"eloquent"},{"word":"forceful","pos":"adj","definition":"Capable of either physical or coercive force; powerful.","topic":"eloquent"},{"word":"strong","pos":"adj","definition":"(loosely) Possessing power, might, or strength.","topic":"eloquent"},{"word":"clear","pos":"adj","definition":"Transparent in colour.","topic":"eloquent"},{"word":"vigorous","pos":"adj","definition":"Physically strong and active.","topic":"eloquent"},{"word":"prominent","pos":"adj","definition":"Likely to attract attention from its size or position; conspicuous.","topic":"eloquent"},{"word":"stark","pos":"adj","definition":"Plain in appearance; barren, desolate.","topic":"eloquent"},{"word":"gloss","pos":"v","definition":"(transitive) To give a gloss or sheen to.","topic":"eloquent"},{"word":"striking","pos":"adj","definition":"Making a strong impression.","topic":"eloquent"},{"word":"sobering","pos":"adj","definition":"Causing more sober thought or concern.","topic":"eloquent"},{"word":"unconvincing","pos":"adj","definition":"not convincing, plausible or believable","topic":"eloquent"},{"word":"expressive","pos":"adj","definition":"Effectively conveying thought or feeling.","topic":"eloquent"},{"word":"moving","pos":"adj","definition":"(not comparable) That moves or move.","topic":"eloquent"},{"word":"potent","pos":"adj","definition":"Powerful; possessing power; effective.","topic":"eloquent"},{"word":"stirring","pos":"adj","definition":"invigorating or inspiring","topic":"eloquent"},{"word":"oratorical","pos":"adj","definition":"of, or relating to oratory or an orator.","topic":"eloquent"},{"word":"glib","pos":"adj","definition":"Having a ready flow of words but lacking thought or understanding; superficial; shallow.","topic":"eloquent"},{"word":"rhetorical","pos":"adj","definition":"Part of or similar to rhetoric, the use of language as a means to persuade.","topic":"eloquent"},{"word":"orate","pos":"v","definition":"To speak formally; to give a speech.","topic":"eloquent"},{"word":"speechworthy","pos":"adj","definition":"Worthy of speech or of being spoken.","topic":"eloquent"},{"word":"voluble","pos":"adj","definition":"(of a person or a manner of speaking) Fluent or having a ready flow of speech.","topic":"eloquent"},{"word":"persuadable","pos":"adj","definition":"Able to be persuaded (convinced).","topic":"eloquent"},{"word":"spoken","pos":"adj","definition":"Relating to speech.","topic":"eloquent"},{"word":"speaking","pos":"adj","definition":"Involving speaking.","topic":"eloquent"},{"word":"articulable","pos":"adj","definition":"(of ideas, thoughts, etc.) Capable of being expressed clearly in language.","topic":"eloquent"},{"word":"verbal","pos":"adj","definition":"Of or relating to words.","topic":"eloquent"},{"word":"convincible","pos":"adj","definition":"Capable of being convinced or won over.","topic":"eloquent"},{"word":"talkable","pos":"adj","definition":"Capable of offering engaging conversation.","topic":"eloquent"},{"word":"articulatable","pos":"adj","definition":"Able to be articulated.","topic":"eloquent"},{"word":"vocable","pos":"n","definition":"(linguistics) A word or utterance, especially with reference to its form rather than its meaning.","topic":"eloquent"},{"word":"advocatory","pos":"adj","definition":"Characteristic of an advocate.","topic":"eloquent"},{"word":"committed","pos":"adj","definition":"Obligated or locked in (often, but not necessarily, by a pledge) to some course of action.","topic":"eloquent"},{"word":"utterable","pos":"adj","definition":"Capable of being expressed in words, especially audibly.","topic":"eloquent"},{"word":"communicable","pos":"adj","definition":"(epidemiology, of a disease) Able to be transmitted between people or animals.","topic":"eloquent"},{"word":"verbalizable","pos":"adj","definition":"Able to be verbalized, or expressed in words.","topic":"eloquent"},{"word":"communicative","pos":"adj","definition":"Eager to communicate; talkative.","topic":"eloquent"},{"word":"expoundable","pos":"adj","definition":"Able to be expounded.","topic":"eloquent"},{"word":"enunciable","pos":"adj","definition":"(of words, linguistic expressions, etc.) Capable of being distinctly enunciated or pronounced in speech.","topic":"eloquent"},{"word":"expressible","pos":"adj","definition":"Able to be expressed.","topic":"eloquent"},{"word":"politic","pos":"n","definition":"A politics; a set of political beliefs.","topic":"eloquent"},{"word":"convinceable","pos":"adj","definition":"(rare) Alternative form of convincible. [Capable of being convinced or won over.]","topic":"eloquent"},{"word":"voiceable","pos":"adj","definition":"(linguistics) Able to be voiced.","topic":"eloquent"},{"word":"sayable","pos":"adj","definition":"Capable of being pronounced or uttered; articulable.","topic":"eloquent"},{"word":"exorable","pos":"adj","definition":"Capable of being moved or persuaded.","topic":"eloquent"},{"word":"phrasable","pos":"adj","definition":"Able to be phrased.","topic":"eloquent"},{"word":"espousable","pos":"adj","definition":"Capable of being espoused.","topic":"eloquent"},{"word":"oralizable","pos":"adj","definition":"Able to be oralized.","topic":"eloquent"},{"word":"empowered","pos":"adj","definition":"(US) Having been given the power to make choices relevant to one's situation.","topic":"eloquent"},{"word":"flexanimous","pos":"adj","definition":"(rare) Having the power to change somebody's mind.","topic":"eloquent"},{"word":"lucent","pos":"adj","definition":"Emitting light; shining, luminous.","topic":"eloquent"},{"word":"elucidatory","pos":"adj","definition":"Serving to elucidate.","topic":"eloquent"},{"word":"speakable","pos":"adj","definition":"That can be spoken; utterable, verbalizable.","topic":"eloquent"},{"word":"intelligible","pos":"adj","definition":"Capable of being understood; clear to the mind.","topic":"eloquent"},{"word":"arguable","pos":"adj","definition":"That can be argued; that can be proven or strongly supported with sound logical deduction, precedent, and evidence.","topic":"eloquent"},{"word":"pithy","pos":"adj","definition":"Concise and meaningful.","topic":"eloquent"},{"word":"robust","pos":"adj","definition":"Evincing strength and health; strong; (often, especially) both large and healthy.","topic":"eloquent"},{"word":"surefooted","pos":"adj","definition":"Confident and capable.","topic":"eloquent"},{"word":"effervescible","pos":"adj","definition":"Capable of effervescing.","topic":"eloquent"},{"word":"pliable","pos":"adj","definition":"Soft, flexible, easily bent, formed, shaped, or molded.","topic":"eloquent"},{"word":"advocated","pos":"adj","definition":"Having been argued in favor of.","topic":"eloquent"},{"word":"verbatim","pos":"adj","definition":"(of a document) Corresponding with the original word for word.","topic":"eloquent"},{"word":"flowy","pos":"adj","definition":"Flowing; able to flow.","topic":"eloquent"},{"word":"argumentative","pos":"adj","definition":"Prone to argue or dispute.","topic":"eloquent"},{"word":"satisfied","pos":"adj","definition":"In a state of satisfaction.","topic":"eloquent"},{"word":"preachable","pos":"adj","definition":"Capable of being preached.","topic":"eloquent"},{"word":"seduceable","pos":"adj","definition":"Able to be seduced.","topic":"eloquent"},{"word":"clarifiable","pos":"adj","definition":"Able to be made clear.","topic":"eloquent"},{"word":"elucidative","pos":"adj","definition":"Explanatory, clarifying; that serves to elucidate.","topic":"eloquent"},{"word":"communicatable","pos":"adj","definition":"Able to be communicated.","topic":"eloquent"},{"word":"veracious","pos":"adj","definition":"Truthful; speaking the truth.","topic":"eloquent"},{"word":"emphasizable","pos":"adj","definition":"(rare) Capable of being emphasized.","topic":"eloquent"},{"word":"convinced","pos":"adj","definition":"In a state of believing, especially from evidence but not necessarily.","topic":"eloquent"},{"word":"statecrafty","pos":"adj","definition":"(rare) Able in statecraft, politically adept.","topic":"eloquent"},{"word":"conversive","pos":"adj","definition":"Capable of being converted or changed.","topic":"eloquent"},{"word":"decisive","pos":"adj","definition":"Having the power or quality of deciding a question or controversy; putting an end to contest or controversy; final; conclusive.","topic":"eloquent"},{"word":"professed","pos":"adj","definition":"Openly declared or acknowledged.","topic":"eloquent"},{"word":"dictatable","pos":"adj","definition":"Capable of being dictated.","topic":"eloquent"},{"word":"cognizant","pos":"adj","definition":"Aware; fully informed; having understanding of a fact.","topic":"eloquent"},{"word":"sapient","pos":"n","definition":"(anthropology) A human being of the species Homo sapiens.","topic":"eloquent"},{"word":"notorious","pos":"adj","definition":"Of a person or entity: generally or widely known for something negative; infamous.","topic":"eloquent"},{"word":"englishable","pos":"adj","definition":"Able to be translated into or expressed in English.","topic":"eloquent"},{"word":"narratable","pos":"adj","definition":"Capable of being narrated.","topic":"eloquent"},{"word":"apertive","pos":"adj","definition":"(medicine) Causing the body to open; dissolving blockages or having a purgative or diuretic effect.","topic":"eloquent"},{"word":"perficient","pos":"adj","definition":"Making or doing thoroughly; efficient; effectual.","topic":"eloquent"},{"word":"ostensible","pos":"adj","definition":"Appearing as such; being such in appearance; professed, supposed (rather than demonstrably true or real).","topic":"eloquent"},{"word":"conversable","pos":"adj","definition":"(of people) Able and inclined to engage in conversation.","topic":"eloquent"},{"word":"coaxable","pos":"adj","definition":"Able to be coaxed.","topic":"eloquent"},{"word":"plausive","pos":"adj","definition":"(rare) Laudable, praisable.","topic":"eloquent"},{"word":"disputatious","pos":"adj","definition":"Inclined to argue or debate; provoking debate.","topic":"eloquent"},{"word":"pronounceable","pos":"adj","definition":"Capable of being distinctly pronounced in speech; enunciable.","topic":"eloquent"},{"word":"evincible","pos":"adj","definition":"Capable of being proved or clearly brought to light; demonstrable.","topic":"eloquent"},{"word":"impressible","pos":"adj","definition":"Capable of being impressed; susceptible of receiving impression.","topic":"eloquent"},{"word":"affirmable","pos":"adj","definition":"Able to be affirmed.","topic":"eloquent"},{"word":"wordable","pos":"adj","definition":"Possible to express in words.","topic":"eloquent"},{"word":"advisive","pos":"adj","definition":"Advisory in tone and content.","topic":"eloquent"},{"word":"immediate","pos":"adj","definition":"Happening right away, instantly, with no delay.","topic":"eloquent"},{"word":"alive","pos":"adj","definition":"Having life; living; not dead.","topic":"eloquent"},{"word":"rebuttable","pos":"adj","definition":"Capable of being rebutted.","topic":"eloquent"},{"word":"argumented","pos":"adj","definition":"Having arguments; parameterized.","topic":"eloquent"},{"word":"intellective","pos":"adj","definition":"Having the capacity to reason and understand.","topic":"eloquent"},{"word":"stressable","pos":"adj","definition":"(linguistics) Capable of being stressed, or emphasized in speech.","topic":"eloquent"},{"word":"speakworthy","pos":"adj","definition":"Worthy of mention; worthy of being spoken; mentionable.","topic":"eloquent"},{"word":"pregnant","pos":"adj","definition":"(chiefly not comparable) Carrying developing offspring within the body.","topic":"eloquent"},{"word":"enticeable","pos":"adj","definition":"Capable of being enticed.","topic":"eloquent"},{"word":"voluntary","pos":"adj","definition":"Done, given, or acting of one's own free will.","topic":"eloquent"},{"word":"marked","pos":"adj","definition":"Having a visible or identifying mark.","topic":"eloquent"},{"word":"intellected","pos":"adj","definition":"Endowed with intellect; intellectual or intelligent.","topic":"eloquent"},{"word":"versant","pos":"n","definition":"A slope of a mountain or mountain ridge.","topic":"eloquent"},{"word":"addressed","pos":"adj","definition":"Having been the audience for an address, speech or presentation.","topic":"eloquent"},{"word":"poised","pos":"adj","definition":"Possessing poise, having self-confidence.","topic":"eloquent"},{"word":"flowable","pos":"adj","definition":"That is able to flow.","topic":"eloquent"},{"word":"credible","pos":"adj","definition":"Believable or plausible.","topic":"eloquent"},{"word":"pliant","pos":"adj","definition":"(figuratively) Easily influenced; tractable.","topic":"eloquent"},{"word":"convertible","pos":"n","definition":"(vehicles) A convertible car: a car with a removable or foldable roof able to convert from a closed to open vehicle and back again.","topic":"eloquent"},{"word":"literate","pos":"adj","definition":"Able to read and write; having literacy.","topic":"eloquent"},{"word":"emissile","pos":"adj","definition":"Able to be emitted or protruded.","topic":"eloquent"},{"word":"motivatable","pos":"adj","definition":"Able to be motivated.","topic":"eloquent"},{"word":"volant","pos":"adj","definition":"Flying, or able to fly.","topic":"eloquent"},{"word":"accentuable","pos":"adj","definition":"Capable of being accentuated","topic":"eloquent"},{"word":"avowable","pos":"adj","definition":"Capable of being avowed or openly acknowledged with confidence.","topic":"eloquent"},{"word":"defensible","pos":"adj","definition":"(of an argument, etc.) Capable of being justified.","topic":"eloquent"},{"word":"defendable","pos":"adj","definition":"Capable of being defended.","topic":"eloquent"},{"word":"seducible","pos":"adj","definition":"Able to be seduced.","topic":"eloquent"},{"word":"translucent","pos":"n","definition":"Something that is translucent.","topic":"eloquent"},{"word":"eulogise","pos":"v","definition":"(British spelling) To praise, celebrate or pay homage to someone, especially in an eloquent formal eulogy.","topic":"eloquent"},{"word":"eulogize","pos":"v","definition":"(transitive) To praise, celebrate or pay homage to (someone), especially in an eloquent formal eulogy.","topic":"eloquent"},{"word":"chrysostom","pos":"n","definition":"The epithet of John Chrysostom, Dio Chrysostom and several other people, given to them for their eloquence.","topic":"eloquent"},{"word":"cicero","pos":"n","definition":"The Roman statesman and orator Mārcus Tullius Cicerō (106–43 BC).","topic":"eloquent"},{"word":"ciceronian","pos":"adj","definition":"(rhetoric) Eloquent, resembling Cicero’s style.","topic":"eloquent"},{"word":"naturally","pos":"adv","definition":"In a natural manner.","topic":"eloquent"},{"word":"oration","pos":"n","definition":"A formal, often ceremonial speech.","topic":"eloquent"},{"word":"oratory","pos":"n","definition":"The art of public speaking, especially in a formal, expressive, or forceful manner.","topic":"eloquent"},{"word":"puffy","pos":"adj","definition":"Swollen or inflated in shape, as if filled with air; pillow-like.","topic":"eloquent"},{"word":"rhetoric","pos":"n","definition":"The art of using language, especially public speaking, as a means to persuade.","topic":"eloquent"},{"word":"rhetorician","pos":"n","definition":"An orator or eloquent public speaker.","topic":"eloquent"},{"word":"shakespeare","pos":"n","definition":"William Shakespeare, an English playwright and poet of the late sixteenth and early seventeenth centuries.","topic":"eloquent"},{"word":"silvered","pos":"adj","definition":"Coated with silver, made reflective or shiny by application of metal.","topic":"eloquent"},{"word":"strain","pos":"n","definition":"(biology) A particular variety of a microbe, virus, or other organism, usually a taxonomically infraspecific one.","topic":"eloquent"},{"word":"apologetic","pos":"adj","definition":"Having the character of apology; regretfully excusing.","topic":"eloquent"},{"word":"eloquence","pos":"n","definition":"The quality of artistry and persuasiveness in speech or writing.","topic":"eloquent"},{"word":"vividly","pos":"adv","definition":"In a vivid manner.","topic":"eloquent"},{"word":"bombastic","pos":"adj","definition":"(of a person, their language or writing) showy in speech and given to using flowery or elaborate terms; grandiloquent; pompous","topic":"eloquent"},{"word":"denunciatory","pos":"adj","definition":"Tending to denounce.","topic":"eloquent"},{"word":"eulogistic","pos":"adj","definition":"Conveying praise or admiration, as in a eulogy.","topic":"eloquent"},{"word":"halting","pos":"adj","definition":"Prone to pauses or breaks; hesitant; broken.","topic":"eloquent"},{"word":"hortatory","pos":"adj","definition":"Giving exhortation or advice; encouraging.","topic":"eloquent"},{"word":"inarticulate","pos":"adj","definition":"(of speech) Not articulated in normal words.","topic":"eloquent"},{"word":"incoherent","pos":"adj","definition":"Not making logical sense; not logically connected or consistent.","topic":"eloquent"},{"word":"laudatory","pos":"adj","definition":"Of or pertaining to praise, or the expression of praise.","topic":"eloquent"},{"word":"prolix","pos":"adj","definition":"Tediously lengthy; dwelling on trivial details.","topic":"eloquent"},{"word":"wordy","pos":"adj","definition":"Using an excessive number of words.","topic":"eloquent"},{"word":"expression","pos":"n","definition":"The action of expressing thoughts, ideas, feelings, etc.","topic":"eloquent"},{"word":"idiomatic","pos":"adj","definition":"Pertaining or conforming to idiom, the natural mode of expression of a language.","topic":"eloquent"},{"word":"english","pos":"adj","definition":"Of or pertaining to England.","topic":"eloquent"},{"word":"vernacular","pos":"n","definition":"The language of a people or a national language.","topic":"eloquent"},{"word":"literally","pos":"adv","definition":"Without overstatement or understatement, or false or misleading words.","topic":"eloquent"},{"word":"tell","pos":"v","definition":"(transitive, ditransitive) To convey by speech; to say.","topic":"eloquent"},{"word":"bundle","pos":"n","definition":"(countable) A group of objects held together by wrapping or tying.","topic":"eloquent"},{"word":"cluster","pos":"n","definition":"A bunch or group of several discrete items that are close to each other.","topic":"eloquent"},{"word":"chunk","pos":"n","definition":"A large or substantial portion of something.","topic":"eloquent"},{"word":"discriminating","pos":"adj","definition":"Having a discerning judgment or taste","topic":"discerning"},{"word":"tactful","pos":"adj","definition":"Possessing tact; able to deal with people in a sensitive manner.","topic":"discerning"},{"word":"prescient","pos":"adj","definition":"Exhibiting or possessing prescience: having knowledge of, or seemingly able to correctly predict, events before they take place.","topic":"discerning"},{"word":"apprehensive","pos":"adj","definition":"Anticipating something with anxiety, fear, or doubt; reluctant.","topic":"discerning"},{"word":"discernment","pos":"n","definition":"The ability to distinguish; judgement.","topic":"discerning"},{"word":"distinguishing","pos":"n","definition":"The act by which something is distinguished or told apart.","topic":"discerning"},{"word":"know","pos":"v","definition":"(transitive) To perceive the truth or factuality of; to be certain of; to be certain that.","topic":"discerning"},{"word":"aware","pos":"adj","definition":"Conscious or having knowledge of something; awake.","topic":"discerning"},{"word":"exacting","pos":"adj","definition":"Making great demands; difficult to satisfy.","topic":"discerning"},{"word":"stringent","pos":"adj","definition":"Strict; binding strongly; making strict requirements; restrictive; rigid; severe","topic":"discerning"},{"word":"determine","pos":"v","definition":"To ascertain definitely; to figure out, find out, or conclude by analyzing, calculating, or investigating.","topic":"discerning"},{"word":"determining","pos":"adj","definition":"Determinative; causal.","topic":"discerning"},{"word":"analytical","pos":"adj","definition":"Of or pertaining to analysis; resolving into elements or constituent parts","topic":"discerning"},{"word":"penetrative","pos":"adj","definition":"That can or does physically penetrate something; piercing, penetrating.","topic":"discerning"},{"word":"sightful","pos":"adj","definition":"Having full sight; clear-sighted; perspicacious and discerning; observant","topic":"discerning"},{"word":"apperceptive","pos":"adj","definition":"Involving or relating to perception.","topic":"discerning"},{"word":"judgeful","pos":"adj","definition":"(rare) Making a judgment; discerning; evaluating.","topic":"discerning"},{"word":"perceptible","pos":"adj","definition":"Able to be perceived, sensed, or discerned.","topic":"discerning"},{"word":"animadversive","pos":"adj","definition":"Characterized by disapproval, critical.","topic":"discerning"},{"word":"distinctive","pos":"adj","definition":"Distinguishing, used to or enabling the distinguishing of some thing.","topic":"discerning"},{"word":"acuminous","pos":"adj","definition":"Characterized by acumen; keen.","topic":"discerning"},{"word":"perceivable","pos":"adj","definition":"Capable of being perceived; discernible.","topic":"discerning"},{"word":"selective","pos":"adj","definition":"(of a person) Choosy, fussy or discriminating when selecting.","topic":"discerning"},{"word":"sentient","pos":"adj","definition":"Experiencing sensation, thought, or feeling.","topic":"discerning"},{"word":"sensable","pos":"adj","definition":"Capable of being sensed; perceptible, tangible.","topic":"discerning"},{"word":"beminded","pos":"adj","definition":"Possessing or endowed with a mind.","topic":"discerning"},{"word":"conscious","pos":"adj","definition":"Alert, awake; with one's mental faculties active.","topic":"discerning"},{"word":"intentive","pos":"adj","definition":"Paying attention; attentive, heedful.","topic":"discerning"},{"word":"understanding","pos":"n","definition":"(uncountable) The act of one that understands or comprehends; the mental process of discernment of meaning.","topic":"discerning"},{"word":"choice","pos":"n","definition":"An option; a decision; an opportunity to choose or select something.","topic":"discerning"},{"word":"heedful","pos":"adj","definition":"Paying close attention; mindful.","topic":"discerning"},{"word":"diacritical","pos":"adj","definition":"Of, pertaining to, or serving as a diacritic.","topic":"discerning"},{"word":"conscienced","pos":"adj","definition":"Having a conscience (of a particular kind).","topic":"discerning"},{"word":"close","pos":"adj","definition":"Having little difference or distance in place, position, or abstractly; see also close to.","topic":"discerning"},{"word":"foresightly","pos":"adj","definition":"(rare) Possessing, exercising, or demonstrating great care or foresight; thoughtful; provident.","topic":"discerning"},{"word":"decisory","pos":"adj","definition":"Synonym of decisive.","topic":"discerning"},{"word":"nimble","pos":"adj","definition":"Quick and light in movement or action.","topic":"discerning"},{"word":"adjudgeable","pos":"adj","definition":"Capable of being adjudged.","topic":"discerning"},{"word":"judgeable","pos":"adj","definition":"Capable of being judged.","topic":"discerning"},{"word":"enminded","pos":"adj","definition":"Sentient; capable of conscious thought.","topic":"discerning"},{"word":"watchful","pos":"adj","definition":"Fully observant, vigilant, or aware.","topic":"discerning"},{"word":"descriable","pos":"adj","definition":"Capable of being descried (detected or perceived).","topic":"discerning"},{"word":"prehendable","pos":"adj","definition":"Capable of being prehended.","topic":"discerning"},{"word":"intuitable","pos":"adj","definition":"Capable of being intuitively sensed or understood.","topic":"discerning"},{"word":"cognoscitive","pos":"adj","definition":"having the power of knowing","topic":"discerning"},{"word":"introspectable","pos":"adj","definition":"Able to be understood by introspecting.","topic":"discerning"},{"word":"sensed","pos":"adj","definition":"(in combination) Having a specified number or kind of senses.","topic":"discerning"},{"word":"precision","pos":"n","definition":"(loosely) The state of being precise or exact; especially, both exact and accurate.","topic":"discerning"},{"word":"analytic","pos":"adj","definition":"Of, or relating to any form of analysis, or to analytics.","topic":"discerning"},{"word":"tenacious","pos":"adj","definition":"Unwilling to yield or give up; dogged.","topic":"discerning"},{"word":"pinpointable","pos":"adj","definition":"Capable of being pinpointed (located precisely).","topic":"discerning"},{"word":"conscientious","pos":"adj","definition":"Thorough, careful, or vigilant in one’s task performance; painstaking.","topic":"discerning"},{"word":"prophetic","pos":"adj","definition":"Of, or relating to a prophecy or a prophet.","topic":"discerning"},{"word":"apprehensible","pos":"adj","definition":"(literary) Which can be apprehended (usually in the sense of being understood).","topic":"discerning"},{"word":"speculatory","pos":"adj","definition":"Exercising speculation or guesswork; speculative.","topic":"discerning"},{"word":"judicable","pos":"adj","definition":"(law) Able to be judged; capable of being tried or decided upon, especially in a legal case.","topic":"discerning"},{"word":"precise","pos":"adj","definition":"(loosely) Both exact and accurate.","topic":"discerning"},{"word":"prehensory","pos":"adj","definition":"Adapted to seize or grasp; prehensile.","topic":"discerning"},{"word":"intellegent","pos":"adj","definition":"Misspelling of intelligent. [Of high or especially quick cognitive capacity, bright.]","topic":"discerning"},{"word":"ingenuitive","pos":"adj","definition":"(nonstandard) Possessing ingenuity; ingenious.","topic":"discerning"},{"word":"discerptible","pos":"adj","definition":"Alternative form of discerpible. [Capable of being discerped.]","topic":"discerning"},{"word":"correct","pos":"adj","definition":"Free from error; true; accurate.","topic":"discerning"},{"word":"intelligenced","pos":"adj","definition":"(in combination) Having a specified kind of intelligence.","topic":"discerning"},{"word":"enlightened","pos":"adj","definition":"Educated or informed.","topic":"discerning"},{"word":"appreciative","pos":"adj","definition":"Showing appreciation or gratitude.","topic":"discerning"},{"word":"dioptric","pos":"n","definition":"(in the plural) The branch of optics concerned with refraction.","topic":"discerning"},{"word":"receptive","pos":"adj","definition":"Ready to receive something, especially new concepts or ideas.","topic":"discerning"},{"word":"espiable","pos":"adj","definition":"Able to be espied; visible or apparent.","topic":"discerning"},{"word":"penetrant","pos":"n","definition":"Something, especially a liquid, that penetrates.","topic":"discerning"},{"word":"cognizable","pos":"adj","definition":"Capable of being known or perceived.","topic":"discerning"},{"word":"mindlike","pos":"adj","definition":"Resembling or characteristic of a mind; capable of thought etc.","topic":"discerning"},{"word":"telescopic","pos":"adj","definition":"Pertaining to, or carried out by means of, a telescope.","topic":"discerning"},{"word":"appreciable","pos":"adj","definition":"(usually) Both detectable and at least modestly substantial: large enough to be estimated and to be of practical relevance.","topic":"discerning"},{"word":"introspectible","pos":"adj","definition":"Alternative form of introspectable. [Able to be understood by introspecting.]","topic":"discerning"},{"word":"discriminative","pos":"adj","definition":"Having or relating to the ability to discriminate between things.","topic":"discerning"},{"word":"opinable","pos":"adj","definition":"Capable of being opined or thought.","topic":"discerning"},{"word":"transpicuous","pos":"adj","definition":"(rare) Easily construed or seen through.","topic":"discerning"},{"word":"well","pos":"adv","definition":"(manner) Accurately, competently, satisfactorily.","topic":"discerning"},{"word":"detectable","pos":"adj","definition":"Able to be detected, noticeable.","topic":"discerning"},{"word":"clairvoyant","pos":"n","definition":"A person able to see things that cannot be perceived by the normal senses","topic":"discerning"},{"word":"judicatory","pos":"n","definition":"The administration of justice by judges and courts; judicial process.","topic":"discerning"},{"word":"conscientous","pos":"adj","definition":"Misspelling of conscientious. [Thorough, careful, or vigilant in one’s task performance; painstaking.]","topic":"discerning"},{"word":"tactical","pos":"adj","definition":"Of or relating to tactics.","topic":"discerning"},{"word":"decided","pos":"adj","definition":"Determined; resolute.","topic":"discerning"},{"word":"detected","pos":"adj","definition":"Having been noticed.","topic":"discerning"},{"word":"gleanable","pos":"adj","definition":"Capable of being gleaned.","topic":"discerning"},{"word":"prehensible","pos":"adj","definition":"Capable of being seized.","topic":"discerning"},{"word":"appraisable","pos":"adj","definition":"Capable of being appraised.","topic":"discerning"},{"word":"salient","pos":"adj","definition":"Prominent; conspicuous.","topic":"discerning"},{"word":"palpable","pos":"adj","definition":"(figurative) Obvious or easily perceived; noticeable.","topic":"discerning"},{"word":"gaugeable","pos":"adj","definition":"Capable of being gauged.","topic":"discerning"},{"word":"sensate","pos":"adj","definition":"Perceived by one or more of the senses.","topic":"discerning"},{"word":"hearing","pos":"n","definition":"(uncountable) The sense used to perceive sound.","topic":"discerning"},{"word":"scent","pos":"n","definition":"A distinctive smell.","topic":"discerning"},{"word":"scented","pos":"adj","definition":"Having a pleasant aroma.","topic":"discerning"},{"word":"taste","pos":"n","definition":"One of the sensations produced by the tongue in response to certain chemicals; the quality of giving this sensation.","topic":"discerning"},{"word":"acid","pos":"n","definition":"(chemistry) Any compound which yields H+ ions (protons) when dissolved in water; an Arrhenius acid.","topic":"discerning"},{"word":"choosy","pos":"adj","definition":"Taking care when choosing that what is chosen best suits one's tastes, desires or requirements.","topic":"discerning"},{"word":"cleared","pos":"adj","definition":"rid of objects or obstructions such as e.g. trees and brush","topic":"discerning"},{"word":"discriminate","pos":"v","definition":"To treat or affect differently, depending on differences in traits.","topic":"discerning"},{"word":"divination","pos":"n","definition":"(uncountable) The act of divining; a foreseeing or foretelling of future events.","topic":"discerning"},{"word":"resolution","pos":"n","definition":"A firm decision or an official decision.","topic":"discerning"},{"word":"tasteful","pos":"adj","definition":"Having or exhibiting good taste; aesthetically pleasing or conforming to expectations or ideals of what is appropriate.","topic":"discerning"},{"word":"amblyopia","pos":"n","definition":"A disorder of visual development in which the brain partially or wholly ignores input from one or both eyes.","topic":"discerning"},{"word":"apparent","pos":"adj","definition":"Clear or manifest to the understanding; plain; evident; obvious; known; palpable; indubitable.","topic":"discerning"},{"word":"astral","pos":"adj","definition":"Relating to or resembling the stars; starry.","topic":"discerning"},{"word":"blind","pos":"adj","definition":"(not comparable) Unable to see, or only partially able to see.","topic":"discerning"},{"word":"blurred","pos":"adj","definition":"Out of focus; partially obscured; smudged.","topic":"discerning"},{"word":"chance","pos":"n","definition":"(countable) An opportunity or possibility.","topic":"discerning"},{"word":"comprehend","pos":"v","definition":"(transitive) To understand or grasp fully and thoroughly; to plumb.","topic":"discerning"},{"word":"confound","pos":"v","definition":"To perplex or puzzle.","topic":"discerning"},{"word":"decern","pos":"v","definition":"To see distinctly (with the eyes or the mind); distinguish (an object or fact); discern.","topic":"discerning"},{"word":"descry","pos":"v","definition":"(transitive) To see, especially from afar; to discover (a distant or obscure object) by the eye; to espy; to discern or detect.","topic":"discerning"},{"word":"detect","pos":"v","definition":"To discover or find by careful search, examination, or probing.","topic":"discerning"},{"word":"detecting","pos":"n","definition":"An act of detection.","topic":"discerning"},{"word":"discover","pos":"v","definition":"(transitive) To find or learn something for the first time.","topic":"discerning"},{"word":"distinguish","pos":"v","definition":"To recognize someone or something as different from others based on its characteristics.","topic":"discerning"},{"word":"distinguisher","pos":"n","definition":"One who, or that which, distinguishes.","topic":"discerning"},{"word":"evident","pos":"adj","definition":"Obviously true by simple observation.","topic":"discerning"}];

function createLeveledWord(record, levelName) {
  const word = createSupplementalWord(record, 0);
  return {
    ...word,
    difficulty: levelName === "everyday" ? "Everyday" : "Polished",
    tone: levelName,
    tags: [...word.tags.filter((tag) => tag !== "extended"), levelName]
  };
}

const everydayWords = [
  ...baseEverydayWords,
  ...everydaySupplementalRecords.map((record) => createLeveledWord(record, "everyday"))
].slice(0, 500);
const polishedWords = [
  ...basePolishedWords,
  ...polishedSupplementalRecords.map((record) => createLeveledWord(record, "polished"))
].slice(0, 500);

const supplementalWords = supplementalWordRecords.map(createSupplementalWord);
const rareWords = [...featuredWords.map(enrichFeaturedWord), ...supplementalWords].slice(0, 500);
const wordLevels = {
  everyday: everydayWords,
  polished: polishedWords,
  rare: rareWords
};
const words = rareWords;
const storedLevel = localStorage.getItem("wordplay.level");
const initialLevel = wordLevels[storedLevel] ? storedLevel : "polished";
const state = {
  index: 0,
  level: initialLevel,
  filteredIndexes: wordLevels[initialLevel].map((_, index) => index),
  saved: new Set(JSON.parse(localStorage.getItem("wordplay.saved") || "[]")),
  dark: localStorage.getItem("wordplay.theme") === "dark"
};

const elements = {
  wordText: document.querySelector("#wordText"),
  wordPronunciation: document.querySelector("#wordPronunciation"),
  wordDescription: document.querySelector("#wordDescription"),
  wordUsage: document.querySelector("#wordUsage"),
  wordEtymology: document.querySelector("#wordEtymology"),
  saveButton: document.querySelector("#saveButton"),
  shuffleButton: document.querySelector("#shuffleButton"),
  themeToggle: document.querySelector("#themeToggle"),
  levelSwitch: document.querySelector("#levelSwitch"),
  savedList: document.querySelector("#savedList"),
  savedEmpty: document.querySelector("#savedEmpty")
};

function getCurrentWords() {
  return wordLevels[state.level] || wordLevels.everyday;
}

function getActiveWord() {
  const currentWords = getCurrentWords();
  return currentWords[state.filteredIndexes[state.index]] || currentWords[0];
}

function render() {
  document.documentElement.classList.toggle("dark", state.dark);
  elements.themeToggle.setAttribute("aria-label", state.dark ? "Use light mode" : "Use dark mode");
  elements.themeToggle.setAttribute("title", state.dark ? "Use light mode" : "Use dark mode");
  elements.themeToggle.querySelector("span").textContent = state.dark ? "☼" : "◐";
  document.querySelectorAll(".level-option").forEach((button) => {
    button.classList.toggle("active", button.dataset.level === state.level);
  });

  const word = getActiveWord();

  elements.wordText.textContent = word.word;
  fitWordToCard();
  elements.wordPronunciation.textContent = word.pronunciation;
  elements.wordDescription.textContent = word.description;
  elements.wordUsage.textContent = word.usage;
  elements.wordEtymology.textContent = word.etymology;

  const isSaved = state.saved.has(word.word);
  elements.saveButton.setAttribute("aria-pressed", String(isSaved));
  elements.saveButton.querySelector("span[aria-hidden]").textContent = isSaved ? "★" : "☆";
  elements.saveButton.setAttribute("aria-label", isSaved ? "Unsave word" : "Save word");
  elements.saveButton.setAttribute("title", isSaved ? "Unsave word" : "Save word");

  renderSaved();
}

function fitWordToCard() {
  const word = elements.wordText;
  const container = word.parentElement;
  if (!word || !container) return;

  word.style.fontSize = "";
  word.style.whiteSpace = "";
  word.style.overflowWrap = "";

  requestAnimationFrame(() => {
    const availableWidth = container.clientWidth;
    if (!availableWidth) return;

    let size = parseFloat(getComputedStyle(word).fontSize);
    const minimumSize = window.matchMedia("(max-width: 640px)").matches ? 42 : 54;

    while (word.getBoundingClientRect().width > availableWidth && size > minimumSize) {
      size -= 4;
      word.style.fontSize = `${size}px`;
    }

    if (word.getBoundingClientRect().width > availableWidth) {
      word.style.whiteSpace = "normal";
      word.style.overflowWrap = "anywhere";
    }
  });
}

function renderSaved() {
  const savedWords = [...everydayWords, ...polishedWords, ...rareWords].filter((word) => state.saved.has(word.word));
  elements.savedList.innerHTML = "";
  elements.savedEmpty.hidden = savedWords.length > 0;

  savedWords.forEach((word) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = word.word;
    button.addEventListener("click", () => {
      state.level = everydayWords.includes(word) ? "everyday" : polishedWords.includes(word) ? "polished" : "rare";
      const currentWords = getCurrentWords();
      state.filteredIndexes = currentWords.map((_, index) => index);
      state.index = currentWords.indexOf(word);
      localStorage.setItem("wordplay.level", state.level);
      render();
    });
    item.append(button);
    elements.savedList.append(item);
  });
}

function moveWord(direction) {
  if (!state.filteredIndexes.length) return;
  const total = state.filteredIndexes.length;
  state.index = (state.index + direction + total) % total;
  render();
}

function shuffleWord() {
  if (state.filteredIndexes.length < 2) return;

  let nextIndex = state.index;
  while (nextIndex === state.index) {
    nextIndex = Math.floor(Math.random() * state.filteredIndexes.length);
  }

  state.index = nextIndex;
  render();
}

function setLevel(level) {
  if (!wordLevels[level] || state.level === level) return;

  state.level = level;
  state.index = 0;
  state.filteredIndexes = getCurrentWords().map((_, index) => index);
  localStorage.setItem("wordplay.level", level);
  render();
}

elements.shuffleButton.addEventListener("click", shuffleWord);

elements.levelSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-level]");
  if (!button) return;
  setLevel(button.dataset.level);
});

elements.saveButton.addEventListener("click", () => {
  const word = getActiveWord().word;
  if (state.saved.has(word)) {
    state.saved.delete(word);
  } else {
    state.saved.add(word);
  }

  localStorage.setItem("wordplay.saved", JSON.stringify([...state.saved]));
  render();
});

elements.themeToggle.addEventListener("click", () => {
  state.dark = !state.dark;
  localStorage.setItem("wordplay.theme", state.dark ? "dark" : "light");
  render();
});

document.addEventListener("keydown", (event) => {
  if (event.target.matches("input")) return;
  if (event.key === "ArrowRight") shuffleWord();
});

render();

if (document.fonts) {
  document.fonts.ready.then(fitWordToCard);
}

window.addEventListener("resize", fitWordToCard);
