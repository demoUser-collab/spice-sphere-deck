import type { Recipe, Step } from "@/types";

/**
 * Beginner-friendly instruction engine.
 * Each technique profile yields steps that explain WHAT to do, WHY it matters,
 * the visual/aroma CUES to look for, timing, the common beginner MISTAKE and
 * a TIP to avoid it. Kept data-driven so a real backend can replace it later.
 */

export type RichStep = Omit<Step, "id" | "order">;

type Profile =
  | "pasta"
  | "noodleSoup"
  | "griddle"
  | "sear"
  | "bake"
  | "raw"
  | "pizza"
  | "simmer"
  | "roast"
  | "sushi";

export function profileFor(recipe: { category: string; cuisine: string; mealType: string }): Profile {
  const c = recipe.category.toLowerCase();
  if (c.includes("pasta")) return "pasta";
  if (c.includes("noodle")) return "noodleSoup";
  if (c.includes("breakfast")) return "griddle";
  if (c.includes("grill")) return "sear";
  if (c.includes("dessert")) return "bake";
  if (c.includes("salad") || c.includes("bowl")) return "raw";
  if (c.includes("pizza")) return "pizza";
  if (c.includes("sushi")) return "sushi";
  if (c.includes("vegetarian") || c.includes("vegan")) return "simmer";
  if (c.includes("quick")) return "sear";
  return "roast";
}

const PROFILES: Record<Profile, RichStep[]> = {
  pasta: [
    {
      text: "Fill a large pot with about 4 litres of water, salt it until it tastes like mild seawater (roughly 1 tablespoon), and bring it to a rolling boil over high heat — this takes 8–10 minutes.",
      why: "Pasta only gets seasoned from the inside while it boils; salting the water is your single best flavour investment.",
      cue: "Big, fast bubbles that don't stop when you stir.",
      mistake: "Using a small pot or unsalted water, which makes the pasta gummy and bland.",
      tip: "Cover the pot while heating to reach the boil faster, then uncover before adding pasta.",
      durationMin: 10,
    },
    {
      text: "While the water heats, prep everything else: peel and finely chop the garlic and onion, measure the cheese, and grind the pepper. Keep them in separate small bowls next to the stove.",
      why: "Pasta sauces move fast; once the pan is hot there is no time to chop.",
      cue: "Every ingredient measured and within arm's reach of the burner.",
      mistake: "Chopping while the pan is already hot, so the aromatics scorch.",
      tip: "Cut the onion into pieces the same size so they cook evenly.",
      durationMin: 8,
    },
    {
      text: "Warm the olive oil and butter in a wide pan over medium heat, add the garlic and onion, and stir gently for 5–7 minutes until soft, translucent and lightly golden.",
      why: "Slow heat draws the natural sugars out of the onion and turns raw, sharp garlic into a sweet, nutty base.",
      cue: "The onion turns glassy at the edges and the kitchen smells sweet and toasty, not sharp.",
      mistake: "Cranking the heat to save time — burnt garlic turns bitter and cannot be rescued.",
      tip: "If it starts browning too fast, slide the pan off the burner for 20 seconds and lower the heat.",
      durationMin: 7,
    },
    {
      text: "Drop the pasta into the boiling water, stir for the first 30 seconds so it doesn't clump, and cook 1–2 minutes less than the package time. Before draining, scoop out a mugful of the starchy cooking water.",
      why: "The pasta finishes cooking in the sauce, and that cloudy water is the emulsifier that makes the sauce cling.",
      cue: "A piece bitten in half still shows a thin pale line in the centre (al dente).",
      mistake: "Draining every drop of water down the sink — then the sauce slides off the pasta.",
      tip: "Set a timer the moment the pasta goes in; even one minute over changes the texture.",
      durationMin: 9,
    },
    {
      text: "Transfer the drained pasta straight into the pan with the aromatics, add a splash of the reserved water, and toss constantly over low heat for 1–2 minutes until a glossy sauce forms and coats every strand.",
      why: "Agitation plus starch plus fat is what emulsifies a sauce; without motion it stays watery or greasy.",
      cue: "The sauce goes from loose and cloudy to creamy and shiny, clinging to the pasta.",
      mistake: "Adding cheese over high heat, which makes it seize into rubbery clumps.",
      tip: "Take the pan off the heat before stirring in cheese, adding it in small handfuls.",
      durationMin: 3,
    },
    {
      text: "Taste and adjust: a pinch of salt, a crack of pepper, a squeeze of lemon or a splash of pasta water if it looks tight. Plate immediately into warm bowls and finish with fresh herbs.",
      why: "Seasoning at the end corrects everything that reduced or concentrated during cooking; acid wakes up rich dishes.",
      cue: "The sauce slowly slides off a spoon rather than dripping or sticking.",
      mistake: "Letting the pasta sit in the pan — it keeps absorbing sauce and dries out within minutes.",
      tip: "Warm the bowls with hot tap water first so the dish stays hot at the table.",
      durationMin: 3,
    },
  ],
  noodleSoup: [
    {
      text: "Gather and prep your toppings first — slice scallions, halve the soft-boiled eggs, and portion any protein — then set them on a tray beside the stove.",
      why: "A noodle bowl is assembled in under two minutes; anything unprepped will arrive cold.",
      cue: "Every topping sliced, plated and ready before a single pot goes on.",
      mistake: "Cooking noodles first and then hunting for toppings, which leaves them bloated.",
      tip: "Warm your serving bowls with hot water while you prep.",
      durationMin: 10,
    },
    {
      text: "Warm the oil in a saucepan over medium heat and cook the garlic, ginger and onion for 2–3 minutes, stirring constantly, until fragrant and just barely golden.",
      why: "Blooming aromatics in fat releases fat-soluble flavour compounds you cannot get from simply boiling them.",
      cue: "A sharp, warm ginger-garlic aroma rises within about a minute.",
      mistake: "Walking away — finely chopped aromatics go from golden to burnt in seconds.",
      tip: "Have the broth measured and ready to pour in the moment they smell right.",
      durationMin: 3,
    },
    {
      text: "Pour in the broth, whisk in the miso or seasoning paste off the boil, and let it simmer gently for 12–15 minutes so the flavours marry.",
      why: "A gentle simmer extracts depth; a hard boil drives off delicate aroma and makes miso grainy.",
      cue: "Small bubbles lazily breaking the surface, never a rolling boil.",
      mistake: "Boiling miso, which flattens its flavour and separates it.",
      tip: "Dissolve the paste in a ladle of hot broth first, then stir it back into the pot.",
      durationMin: 15,
    },
    {
      text: "Cook the noodles in a separate pot of boiling water for the time on the package, usually 3–4 minutes, then drain and rinse briefly.",
      why: "Cooking noodles in the broth releases starch and turns your soup cloudy and sludgy.",
      cue: "Noodles are springy with a slight chew, not soft all the way through.",
      mistake: "Letting cooked noodles sit in water — they keep swelling and turn mushy.",
      tip: "Undercook by 30 seconds; the hot broth finishes them in the bowl.",
      durationMin: 4,
    },
    {
      text: "Divide the noodles between the warm bowls, ladle the hot broth over them, and arrange the toppings in neat sections on the surface. Serve straight away.",
      why: "Grouping toppings keeps textures distinct and lets each spoonful taste different.",
      cue: "Steam rising, broth just below the noodle line.",
      mistake: "Over-filling with broth so toppings sink and go soggy.",
      tip: "Finish with a few drops of toasted sesame or chilli oil right before serving.",
      durationMin: 3,
    },
  ],
  griddle: [
    {
      text: "Whisk the dry ingredients together in a large bowl until evenly combined, and whisk the wet ingredients in a second bowl.",
      why: "Mixing leavening evenly through the flour prevents bitter pockets and uneven rise.",
      cue: "The dry mix looks uniform in colour with no streaks.",
      mistake: "Dumping everything into one bowl, which leaves lumps of raw flour.",
      tip: "Bring eggs and dairy to room temperature for a smoother, fluffier batter.",
      durationMin: 6,
    },
    {
      text: "Pour the wet mixture into the dry and fold with a spatula just until no dry flour remains — about 10 strokes. Lumps are fine and expected.",
      why: "Over-mixing develops gluten, and gluten makes pancakes tough and rubbery instead of tender.",
      cue: "A thick, slightly lumpy batter that falls off the spatula in ribbons.",
      mistake: "Whisking until perfectly smooth — the classic beginner error here.",
      tip: "Rest the batter 10 minutes; the flour hydrates and the texture improves noticeably.",
      durationMin: 3,
    },
    {
      text: "Heat a non-stick pan or griddle over medium heat for 2–3 minutes and lightly grease it with butter, wiping away the excess with a paper towel.",
      why: "A properly preheated, barely greased surface gives an even golden crust rather than a greasy, blotchy one.",
      cue: "A drop of water skitters and evaporates in a couple of seconds.",
      mistake: "Cooking on high heat, which burns the outside while the middle stays raw batter.",
      tip: "Cook one small test pancake first and adjust the heat before committing the batch.",
      durationMin: 3,
    },
    {
      text: "Ladle the batter into the pan and cook undisturbed for 2–3 minutes, until bubbles form and pop across the surface and the edges look set and matte.",
      why: "Those bubbles are the leavening working; when they stay open, the underside is cooked through.",
      cue: "Dry, set edges and a lattice of open bubbles on top.",
      mistake: "Flipping too early, which deflates the pancake and leaves it dense.",
      tip: "Slide the spatula fully underneath before flipping, and flip in one confident motion.",
      durationMin: 3,
    },
    {
      text: "Flip once and cook another 1–2 minutes until puffed and golden brown, then move to a wire rack or a warm oven at 90°C while you cook the rest.",
      why: "A rack keeps steam from escaping downward, so the bottoms stay crisp instead of going soggy.",
      cue: "The pancake springs back when pressed lightly in the centre.",
      mistake: "Pressing down with the spatula, which squeezes out all the air you just created.",
      tip: "Never flip twice — one flip only.",
      durationMin: 2,
    },
    {
      text: "Serve warm with your toppings, adding anything fresh (berries, herbs, citrus zest) at the very last moment.",
      why: "Fresh toppings lose their brightness and texture within minutes of hitting heat.",
      cue: "Butter melting slowly into the surface.",
      mistake: "Stacking too high — the bottom layers steam and go limp.",
      tip: "Warm your syrup for 20 seconds so it doesn't cool the plate.",
      durationMin: 2,
    },
  ],
  sear: [
    {
      text: "Take the main ingredient out of the fridge 30 minutes ahead, pat it completely dry with paper towel, and season it generously on all sides with salt and pepper.",
      why: "Surface moisture steams instead of browning, and cold centres cook unevenly.",
      cue: "The surface looks matte and dry, not glistening.",
      mistake: "Seasoning straight from the fridge and going straight into the pan — the result is grey, not brown.",
      tip: "Season from a height so the salt lands evenly.",
      durationMin: 30,
    },
    {
      text: "Heat a heavy pan or grill over medium-high for 3–4 minutes, then add a thin film of high-smoke-point oil and let it shimmer.",
      why: "A truly hot, heavy surface is what creates the Maillard crust that carries most of the flavour.",
      cue: "The oil ripples and moves like water; a wisp of smoke means it's ready now.",
      mistake: "Using butter or olive oil alone at this heat — both burn and taste acrid.",
      tip: "Turn the extractor fan on and keep a lid nearby; hot fat can spit. Never add water to hot oil.",
      durationMin: 4,
    },
    {
      text: "Lay the food away from you into the pan and leave it completely alone for 3–4 minutes per side.",
      why: "A crust only forms when the surface stays in constant contact with the hot metal.",
      cue: "It releases from the pan on its own and shows a deep mahogany crust; the aroma turns nutty and roasted.",
      mistake: "Nudging and flipping constantly, which drops the pan temperature and prevents browning.",
      tip: "If it sticks when you try to lift it, it isn't ready — give it another 30 seconds.",
      durationMin: 8,
    },
    {
      text: "Lower the heat, add butter, garlic and herbs, and spoon the foaming butter over the food for the last 1–2 minutes.",
      why: "Basting cooks the top gently and layers on aromatic flavour without a second burnt surface.",
      cue: "The butter foams and smells nutty and toasted, not dark brown or acrid.",
      mistake: "Adding butter too early, so it burns black long before the food is done.",
      tip: "Tilt the pan toward you so the butter pools and is easy to spoon.",
      durationMin: 2,
    },
    {
      text: "Move everything to a board and rest it for 5–10 minutes before slicing, loosely tented with foil.",
      why: "Resting lets the juices redistribute; cutting immediately spills them onto the board and dries out the food.",
      cue: "The surface stops sizzling and the board stays mostly dry when you slice.",
      mistake: "Skipping the rest because it smells too good to wait.",
      tip: "Slice against the grain in finger-thick pieces for the most tender bite.",
      durationMin: 8,
    },
    {
      text: "Finish with flaky salt, a squeeze of lemon and the pan juices poured over, then serve immediately.",
      why: "Acid and finishing salt cut through richness and make the whole plate taste brighter.",
      cue: "The surface glistens and the salt crystals stay visible.",
      mistake: "Over-salting at the end after already seasoning heavily — taste first.",
      tip: "Try a spoon of chimichurri or herb butter as an easy variation.",
      durationMin: 2,
    },
  ],
  bake: [
    {
      text: "Heat the oven to the stated temperature at least 20 minutes ahead and position the rack in the middle. Line and grease your tin.",
      why: "Ovens lie; the light goes off well before the oven is actually at temperature, and an under-heated oven ruins rise.",
      cue: "An oven thermometer, if you have one, holds steady at the target temperature.",
      mistake: "Putting the batter into an oven that only just beeped.",
      tip: "Middle rack for even heat; too high browns the top before the middle sets.",
      durationMin: 20,
    },
    {
      text: "Weigh every ingredient and bring butter, eggs and dairy to room temperature before you begin.",
      why: "Baking is chemistry — volume measures vary wildly, and cold fat won't emulsify.",
      cue: "Butter dents easily under a finger but still holds its shape.",
      mistake: "Melting butter in the microwave to speed things up, which collapses the structure.",
      tip: "Sit eggs in warm water for 5 minutes to warm them fast.",
      durationMin: 10,
    },
    {
      text: "Cream the butter and sugar on medium speed for 3–5 minutes until pale, light and visibly increased in volume, then add the eggs one at a time.",
      why: "Creaming beats air into the fat, and that trapped air is most of your lift.",
      cue: "The mixture turns from yellow to almost ivory and looks fluffy.",
      mistake: "Adding all the eggs at once, which curdles the mix and knocks out the air.",
      tip: "Scrape the bowl down twice so nothing stays unmixed at the bottom.",
      durationMin: 5,
    },
    {
      text: "Fold in the dry ingredients in two or three additions with a spatula, stopping the moment no flour streaks remain.",
      why: "Gentle folding preserves the air; over-mixing makes cakes tough and tunnelled.",
      cue: "A smooth batter that drops slowly off the spatula.",
      mistake: "Using the mixer at this stage on high speed.",
      tip: "Sift the flour to avoid lumps and lighten the crumb.",
      durationMin: 4,
    },
    {
      text: "Bake in the middle of the oven without opening the door for the first two-thirds of the time, then check for doneness.",
      why: "Opening the door drops the temperature sharply and can collapse a rising bake.",
      cue: "The edges pull away slightly from the tin, the top springs back, and a skewer comes out with moist crumbs and no wet batter.",
      mistake: "Peeking early, or trusting the clock over the skewer test.",
      tip: "If the top browns too fast, tent it loosely with foil and continue baking.",
      durationMin: 35,
    },
    {
      text: "Cool in the tin for 10 minutes, then turn out onto a wire rack and cool completely before glazing or slicing.",
      why: "Warm bakes are still setting; slicing early makes them gummy and glaze slides straight off.",
      cue: "The base feels barely warm to the back of your hand.",
      mistake: "Impatiently cutting into it hot — the classic and painful beginner error.",
      tip: "Chocolate or fruit variations work well folded in at the final mixing stage.",
      durationMin: 40,
    },
  ],
  raw: [
    {
      text: "Wash all produce under cold running water and dry it thoroughly in a salad spinner or with a clean towel.",
      why: "Water left on leaves dilutes the dressing so it slides off instead of coating.",
      cue: "Leaves feel dry and squeaky, not slick.",
      mistake: "Dressing wet leaves, which produces a watery, bland salad.",
      tip: "Chill the dried leaves for 15 minutes for maximum crunch.",
      durationMin: 8,
    },
    {
      text: "Cut everything into similar bite-sized pieces, using a sharp knife and a stable board set on a damp cloth.",
      why: "Even pieces mean every forkful has a bit of everything, and a sharp knife bruises delicate produce far less.",
      cue: "Clean-cut edges with no crushed, weeping surfaces.",
      mistake: "Using a dull knife — it's the leading cause of slips and cut fingers.",
      tip: "Curl your fingertips under and let the knife rest against your knuckles.",
      durationMin: 10,
    },
    {
      text: "Whisk the dressing in a jar: three parts oil to one part acid, plus salt, pepper and a small spoon of mustard or honey. Shake hard for 20 seconds until it thickens.",
      why: "Mustard and honey act as emulsifiers, holding oil and acid together so it doesn't split on the plate.",
      cue: "The dressing turns opaque and slightly thick, and coats the inside of the jar.",
      mistake: "Pouring oil and vinegar on separately — the salad ends up harsh in some bites, oily in others.",
      tip: "Always taste the dressing on a leaf, not off the spoon.",
      durationMin: 4,
    },
    {
      text: "Toast the nuts or seeds in a dry pan over medium heat for 3–4 minutes, shaking often, then tip them straight out onto a plate.",
      why: "Toasting releases oils and adds the roasted aroma and crunch that lifts a raw dish.",
      cue: "They turn one shade darker and smell distinctly nutty.",
      mistake: "Leaving them in the hot pan after the heat is off — carry-over heat burns them.",
      tip: "Nuts go from perfect to burnt in about 20 seconds; stay at the pan.",
      durationMin: 4,
    },
    {
      text: "Dress and toss with your hands or two large spoons in a wide bowl right before serving, adding the dressing gradually.",
      why: "A wide bowl and gentle lifting coats evenly without crushing anything.",
      cue: "Every leaf glistens lightly; no dressing pooled at the bottom.",
      mistake: "Dressing far ahead of time, which wilts everything within 10 minutes.",
      tip: "Add cheese, avocado and crunchy toppings after tossing so they stay intact.",
      durationMin: 3,
    },
  ],
  pizza: [
    {
      text: "Mix flour, water, salt and yeast, then knead for 8–10 minutes until the dough is smooth and elastic.",
      why: "Kneading builds the gluten network that traps gas and gives the crust its chew.",
      cue: "The dough springs back when poked and can stretch thin enough to see light through it.",
      mistake: "Adding lots of extra flour because it feels sticky — this gives a dense, dry crust.",
      tip: "Wet your hands lightly instead of flouring the dough.",
      durationMin: 12,
    },
    {
      text: "Cover and let it rise at room temperature for 1–2 hours, or overnight in the fridge for far better flavour.",
      why: "Slow fermentation develops complex, slightly tangy flavour that fast rising never achieves.",
      cue: "Roughly doubled in size, domed and full of small bubbles.",
      mistake: "Rushing the rise in a hot spot, producing a bland, yeasty crust.",
      tip: "A cold overnight rise is genuinely the easiest upgrade available to you.",
      durationMin: 90,
    },
    {
      text: "Heat the oven with a stone or heavy tray inside at the highest temperature it will reach for at least 45 minutes.",
      why: "Pizza needs fierce bottom heat to puff and char before the toppings overcook.",
      cue: "The stone is too hot to hold a hand near for more than a second.",
      mistake: "Baking on a cold tray, which gives a pale, biscuity base.",
      tip: "Use the grill/broiler for the last minute for leopard-spotted edges.",
      durationMin: 45,
    },
    {
      text: "Stretch the dough by hand from the centre outward, leaving a thicker 2 cm rim. Never use a rolling pin.",
      why: "Hand-stretching keeps the air bubbles in the rim that become the puffy cornicione.",
      cue: "An even, thin centre with a visibly raised border.",
      mistake: "Rolling it flat, which crushes all the gas out.",
      tip: "If it keeps snapping back, let it rest 10 minutes and try again.",
      durationMin: 6,
    },
    {
      text: "Top sparingly — a thin layer of sauce, torn cheese, then bake 6–8 minutes until the crust is blistered and the cheese is bubbling.",
      why: "Too many wet toppings release steam and give a soggy centre.",
      cue: "Charred spots on the rim and cheese just starting to brown.",
      mistake: "Overloading the pizza, the single most common home mistake.",
      tip: "Add basil and olive oil after baking, never before.",
      durationMin: 8,
    },
  ],
  simmer: [
    {
      text: "Rinse the pulses or grains in cold water until it runs clear, then drain well.",
      why: "Rinsing removes surface starch and dust that would make the finished dish cloudy and heavy.",
      cue: "The water running off is clear rather than milky.",
      mistake: "Skipping the rinse and wondering why the texture is gluey.",
      tip: "Soaking harder pulses for a few hours shortens cooking noticeably.",
      durationMin: 5,
    },
    {
      text: "Warm the oil or ghee over medium heat and add the whole spices, letting them sizzle for 30–45 seconds.",
      why: "Blooming spices in hot fat unlocks aromatics that stay locked away in a watery pot.",
      cue: "The seeds pop and crackle and a warm, toasty aroma rises immediately.",
      mistake: "Letting them go dark — burnt spice turns the whole dish bitter.",
      tip: "Have the onions ready to go in the second the spices smell right; they stop the cooking.",
      durationMin: 1,
    },
    {
      text: "Add the onions, garlic and ginger and cook 6–8 minutes, stirring often, until soft and golden at the edges.",
      why: "This base carries the sweetness and body of the whole dish.",
      cue: "The onion goes translucent then pale gold, and the raw garlic smell disappears.",
      mistake: "Under-cooking the base, which leaves a harsh, raw onion bite in the finished dish.",
      tip: "A pinch of salt now draws out water and speeds up softening.",
      durationMin: 8,
    },
    {
      text: "Stir in the ground spices and tomatoes, cook for 3–4 minutes, then add the pulses and liquid and bring to a gentle simmer.",
      why: "Cooking the tomato and spice paste until the oil separates removes rawness and deepens colour.",
      cue: "The mixture darkens and small beads of oil appear around the edges.",
      mistake: "Adding liquid too early, which leaves the spices tasting dusty.",
      tip: "Scrape the browned bits off the pan bottom as the liquid goes in — that's pure flavour.",
      durationMin: 5,
    },
    {
      text: "Cover partially and simmer gently for 25–30 minutes, stirring every 8–10 minutes, until everything is tender and the sauce has thickened.",
      why: "A low, slow simmer breaks the pulses down into a naturally creamy sauce without any dairy.",
      cue: "Lazy bubbles at the surface and a spoon leaves a brief trail through the pot.",
      mistake: "Boiling hard or forgetting to stir, which scorches the bottom.",
      tip: "Add hot, not cold, water if it thickens too much, so the simmer isn't interrupted.",
      durationMin: 30,
    },
    {
      text: "Season at the end with salt, a squeeze of lemon and fresh coriander, then let it sit off the heat for 5 minutes before serving.",
      why: "Salting at the end prevents pulses from toughening, and resting lets the flavours settle.",
      cue: "The dish tastes rounded rather than sharp or flat.",
      mistake: "Salting heavily at the start, which can keep pulses firm no matter how long they cook.",
      tip: "A spoon of coconut milk or yoghurt is an easy variation for extra richness.",
      durationMin: 6,
    },
  ],
  roast: [
    {
      text: "Heat the oven to 200°C and get all your prep done: chop everything to an even size and pat proteins dry.",
      why: "Even sizing is the difference between everything finishing together and half of it burning.",
      cue: "Pieces roughly the same dimension, spread out on the board.",
      mistake: "Mixing tiny and huge pieces on one tray.",
      tip: "Line the tray with baking paper for easy cleanup, not foil, which can stick.",
      durationMin: 12,
    },
    {
      text: "Toss everything with oil, salt and pepper and spread it in a single layer with space between pieces.",
      why: "Crowding traps steam, and steamed food never browns.",
      cue: "You can see tray between the pieces.",
      mistake: "Piling everything onto one tray to save washing up.",
      tip: "Use two trays if needed and swap their positions halfway.",
      durationMin: 5,
    },
    {
      text: "Sauté the aromatics in a pan over medium heat for 5–7 minutes until soft and lightly golden, stirring occasionally.",
      why: "Softened aromatics add sweetness and depth that raw ones cannot.",
      cue: "Translucent, glossy and sweetly fragrant.",
      mistake: "High heat, which browns the outside before the inside softens.",
      tip: "If they catch, add a splash of water and scrape the pan.",
      durationMin: 7,
    },
    {
      text: "Roast for 25–35 minutes, turning everything once halfway through with tongs.",
      why: "Turning exposes a fresh surface to the hot tray, giving even colour on all sides.",
      cue: "Deep golden edges, tender centres, and a rich roasted aroma filling the kitchen.",
      mistake: "Opening the oven repeatedly, which stalls browning.",
      tip: "Use an oven glove and pull the rack out rather than reaching inside.",
      durationMin: 30,
    },
    {
      text: "Combine everything, taste, and adjust with salt, acid and fresh herbs off the heat.",
      why: "Final seasoning corrects for moisture lost in the oven and brightens deep roasted flavours.",
      cue: "Flavours taste balanced — neither flat nor sharp.",
      mistake: "Adding delicate herbs while the pan is still hot, which dulls them instantly.",
      tip: "A little lemon zest at the end adds aroma without extra acidity.",
      durationMin: 4,
    },
    {
      text: "Plate on warmed dishes, garnish, and serve right away.",
      why: "Roasted textures soften as they sit; the crisp edges are best in the first few minutes.",
      cue: "Still steaming as it reaches the table.",
      mistake: "Covering with a lid, which traps steam and softens everything you worked for.",
      tip: "Leftovers reheat best in a hot oven, never a microwave.",
      durationMin: 3,
    },
  ],
  sushi: [
    {
      text: "Rinse the sushi rice in cold water 4–5 times until the water runs almost clear, then drain for 15 minutes.",
      why: "Excess surface starch makes the rice pasty instead of individually glossy grains.",
      cue: "The rinse water goes from milky to nearly clear.",
      mistake: "Rinsing once and moving on.",
      tip: "Swirl gently with your fingers; scrubbing breaks the grains.",
      durationMin: 15,
    },
    {
      text: "Cook the rice with the exact measured water, lid on, then let it steam off the heat for 10 minutes without lifting the lid.",
      why: "The residual steam finishes the grains evenly; lifting the lid releases it and gives you hard centres.",
      cue: "Small craters on the surface and no free water left in the pot.",
      mistake: "Peeking, or stirring during cooking.",
      tip: "Set a timer and physically walk away.",
      durationMin: 25,
    },
    {
      text: "Fold the warm rice with seasoned vinegar using a cutting motion with a flat spatula, fanning as you go.",
      why: "Cutting rather than stirring seasons the rice without smashing the grains; fanning gives the glossy finish.",
      cue: "Grains look shiny and separate, and the rice cools to body temperature.",
      mistake: "Stirring it like risotto and turning it to paste.",
      tip: "Use a wide non-metal bowl so it cools quickly and evenly.",
      durationMin: 8,
    },
    {
      text: "Slice the fish with a very sharp knife in one smooth pull, against the grain, into even 5 mm pieces. Use only sushi-grade fish kept cold.",
      why: "Sawing tears delicate flesh; grade and temperature control are food-safety essentials with raw fish.",
      cue: "Clean, mirror-smooth cut faces.",
      mistake: "Using ordinary fish or letting it sit at room temperature — a genuine safety risk.",
      tip: "Keep the fish on a chilled plate and return it to the fridge between batches.",
      durationMin: 10,
    },
    {
      text: "Wet your hands lightly, shape a small oval of rice, dab wasabi on the fish, and press the two together gently.",
      why: "Light pressure keeps the rice airy so it dissolves in the mouth.",
      cue: "The piece holds together when lifted but is not compacted.",
      mistake: "Squeezing hard, which makes a dense rice brick.",
      tip: "Serve within the hour; the rice hardens quickly in the fridge.",
      durationMin: 12,
    },
  ],
};

const EXTRAS: Record<Profile, Pick<Recipe, "tips" | "chefNotes" | "substitutions" | "storage" | "reheating" | "serving" | "pairings" | "allergens" | "equipment">> = {
  pasta: {
    tips: ["Salt the water, never the sauce first.", "Reserve pasta water before draining — always.", "Finish the pasta in the pan, not on the plate."],
    chefNotes: "The sauce should be finished in under two minutes. If it looks tight, one spoon of pasta water at a time will fix it every single time.",
    substitutions: [
      { from: "Parmesan", to: "Pecorino or aged Grana Padano" },
      { from: "Butter", to: "Good olive oil for a dairy-lighter version" },
      { from: "Fresh herbs", to: "Half the quantity of dried, added earlier" },
    ],
    storage: "Keeps 2 days in an airtight container in the fridge. Sauced pasta absorbs liquid overnight, so expect it to look dry.",
    reheating: "Reheat in a pan over low heat with a splash of water or milk, tossing until glossy again. Avoid the microwave.",
    serving: "Serve in warmed shallow bowls with extra grated cheese and cracked pepper at the table.",
    pairings: ["Crisp green salad", "Garlic bread", "Dry white wine", "Sparkling water with lemon"],
    allergens: ["Gluten", "Dairy"],
    equipment: ["Large pot", "Wide sauté pan", "Colander", "Microplane"],
  },
  noodleSoup: {
    tips: ["Cook noodles separately from the broth.", "Warm the bowls before serving.", "Season the broth at the end, after reduction."],
    chefNotes: "Broth depth comes from time, not salt. Give it the full simmer before you reach for more seasoning.",
    substitutions: [{ from: "Miso", to: "Light soy plus a spoon of tahini" }, { from: "Ramen noodles", to: "Udon, soba or rice noodles" }],
    storage: "Store broth and noodles separately for up to 3 days; noodles turn to mush if left in liquid.",
    reheating: "Reheat the broth to a simmer, then pour over freshly warmed noodles.",
    serving: "Serve immediately in deep warmed bowls with toppings arranged in sections.",
    pairings: ["Gyoza", "Pickled cucumber", "Green tea", "Chilli oil"],
    allergens: ["Gluten", "Soy", "Egg"],
    equipment: ["Saucepan", "Second pot for noodles", "Ladle", "Deep bowls"],
  },
  griddle: {
    tips: ["Lumpy batter is correct batter.", "Rest the batter 10 minutes.", "One flip only."],
    chefNotes: "Medium heat and patience beat every fancy technique here. The first pancake is your calibration test — expect to sacrifice it.",
    substitutions: [{ from: "Buttermilk", to: "Milk plus 1 tsp lemon juice, rested 5 minutes" }, { from: "Butter", to: "Neutral oil or coconut oil" }],
    storage: "Cool completely, then refrigerate up to 3 days or freeze between sheets of paper for 2 months.",
    reheating: "Toaster for 1 minute, or a 160°C oven for 5 minutes. Both keep the edges crisp.",
    serving: "Stack no more than four high, with butter melting between the layers.",
    pairings: ["Maple syrup", "Fresh berries", "Crisp bacon", "Filter coffee"],
    allergens: ["Gluten", "Dairy", "Egg"],
    equipment: ["Two mixing bowls", "Whisk", "Non-stick pan", "Wire rack"],
  },
  sear: {
    tips: ["Dry surface, hot pan, no fiddling.", "Rest before slicing — always.", "Season from a height for even coverage."],
    chefNotes: "A thermometer removes all guesswork here; pull 3°C below your target because carry-over heat finishes the job.",
    substitutions: [{ from: "Butter", to: "Ghee for a higher smoke point" }, { from: "Fresh thyme", to: "Rosemary or oregano" }],
    storage: "Refrigerate up to 3 days, sliced or whole, in an airtight container with any resting juices.",
    reheating: "Warm gently in a 130°C oven until just heated through, then flash in a hot pan for 30 seconds to revive the crust.",
    serving: "Slice against the grain and spoon the pan juices over just before it reaches the table.",
    pairings: ["Roast potatoes", "Chimichurri", "Bold red wine", "Grilled asparagus"],
    allergens: ["Dairy"],
    equipment: ["Heavy or cast-iron pan", "Tongs", "Instant-read thermometer", "Carving board"],
  },
  bake: {
    tips: ["Weigh, don't scoop.", "Room-temperature ingredients emulsify properly.", "Trust the skewer, not the clock."],
    chefNotes: "Baking rewards precision more than instinct. Read the whole method once before you start and set everything out first.",
    substitutions: [{ from: "Plain flour", to: "1:1 gluten-free blend plus 1/4 tsp xanthan gum" }, { from: "Butter", to: "Equal weight of neutral oil for a moister crumb" }],
    storage: "Airtight at room temperature for 3 days, or wrapped and frozen for 2 months.",
    reheating: "10 minutes at 150°C revives the texture. Never microwave a glazed bake.",
    serving: "Serve at room temperature so the fats soften and the flavour opens up.",
    pairings: ["Espresso", "Vanilla ice cream", "Crème fraîche", "Fresh raspberries"],
    allergens: ["Gluten", "Dairy", "Egg", "May contain nuts"],
    equipment: ["Digital scale", "Stand or hand mixer", "Spatula", "Wire rack"],
  },
  raw: {
    tips: ["Dry leaves or the dressing slides off.", "Dress at the last possible moment.", "Toast nuts for depth."],
    chefNotes: "Balance is everything: fat, acid, salt, crunch and something sweet. If it tastes flat, it's almost always missing acid.",
    substitutions: [{ from: "Feta", to: "Toasted seeds or vegan feta" }, { from: "Lemon juice", to: "White wine or apple cider vinegar" }],
    storage: "Store components separately for up to 3 days; dressed salad does not keep.",
    reheating: "Not applicable — serve cold or at room temperature.",
    serving: "Serve in a wide shallow bowl so nothing gets crushed under its own weight.",
    pairings: ["Crusty bread", "Grilled chicken", "Chilled rosé", "Soup"],
    allergens: ["Dairy", "Nuts"],
    equipment: ["Salad spinner", "Sharp knife", "Wide bowl", "Jar for dressing"],
  },
  pizza: {
    tips: ["Cold-ferment the dough overnight.", "Preheat the stone for 45 minutes.", "Less topping, better pizza."],
    chefNotes: "Your home oven is the limitation, not your dough. Maximum heat, maximum preheat, and finish under the grill.",
    substitutions: [{ from: "Fresh mozzarella", to: "Low-moisture mozzarella for less sogginess" }, { from: "00 flour", to: "Strong bread flour" }],
    storage: "Refrigerate slices up to 3 days, wrapped loosely.",
    reheating: "A dry pan over medium heat with a lid for 3 minutes crisps the base and melts the cheese.",
    serving: "Slice with a rocking cutter and eat within minutes of leaving the oven.",
    pairings: ["Rocket salad", "Chilli honey", "Cold beer", "Balsamic drizzle"],
    allergens: ["Gluten", "Dairy"],
    equipment: ["Pizza stone or steel", "Peel or flat tray", "Bench scraper"],
  },
  simmer: {
    tips: ["Bloom whole spices in fat first.", "Salt at the end for pulses.", "Stir the bottom regularly."],
    chefNotes: "This gets better overnight. Make it a day ahead and the spices round out beautifully.",
    substitutions: [{ from: "Ghee", to: "Coconut oil for a vegan version" }, { from: "Red lentils", to: "Yellow split peas, with longer cooking" }],
    storage: "Fridge for 4 days, freezer for 3 months. It thickens considerably when cold.",
    reheating: "Reheat on the hob with a splash of hot water, stirring until loose and steaming.",
    serving: "Serve over rice or with flatbread, with a spoon of yoghurt and fresh coriander.",
    pairings: ["Basmati rice", "Naan", "Cucumber raita", "Lime pickle"],
    allergens: ["Dairy (optional)"],
    equipment: ["Heavy saucepan", "Wooden spoon", "Fine sieve"],
  },
  roast: {
    tips: ["Even pieces, single layer, hot oven.", "Turn once halfway.", "Finish with acid."],
    chefNotes: "Space on the tray is the whole secret. Two trays with room beat one crowded tray every time.",
    substitutions: [{ from: "Olive oil", to: "Any neutral high-heat oil" }, { from: "Fresh herbs", to: "Dried, added before roasting" }],
    storage: "Airtight in the fridge for 4 days.",
    reheating: "10 minutes at 200°C restores the crisp edges; microwaving makes them limp.",
    serving: "Serve hot from the tray with the pan juices spooned over.",
    pairings: ["Grain salad", "Yoghurt sauce", "Crusty bread", "Light red wine"],
    allergens: [],
    equipment: ["Two baking trays", "Tongs", "Oven gloves"],
  },
  sushi: {
    tips: ["Rinse the rice until nearly clear.", "Cool the rice while folding.", "Keep fish cold at all times."],
    chefNotes: "Rice is 80% of sushi. Get the rice right and even simple pieces taste excellent.",
    substitutions: [{ from: "Raw salmon", to: "Smoked salmon, seared tuna or avocado" }, { from: "Rice vinegar", to: "Mild white wine vinegar plus a pinch of sugar" }],
    storage: "Best eaten immediately. Never keep assembled raw-fish sushi longer than a few hours, refrigerated.",
    reheating: "Not applicable — never reheat raw fish preparations.",
    serving: "Serve at just below room temperature with soy, pickled ginger and wasabi.",
    pairings: ["Miso soup", "Edamame", "Green tea", "Dry sake"],
    allergens: ["Fish", "Soy"],
    equipment: ["Rice cooker or heavy pot", "Very sharp knife", "Wide wooden bowl"],
  },
};

export function buildSteps(recipe: { category: string; cuisine: string; mealType: string }): Step[] {
  return PROFILES[profileFor(recipe)].map((s, i) => ({ ...s, id: `s${i + 1}`, order: i + 1 }));
}

export function buildExtras(recipe: { category: string; cuisine: string; mealType: string }) {
  return EXTRAS[profileFor(recipe)];
}
