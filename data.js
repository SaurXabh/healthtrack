/* ============================================
   VitalFlow — Food & Exercise Database
   ============================================ */

const FOOD_DATABASE = [
    // Fruits
    { name: "Apple", emoji: "🍎", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, serving: "1 medium (182g)", category: "fruit" },
    { name: "Banana", emoji: "🍌", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, serving: "1 medium (118g)", category: "fruit" },
    { name: "Orange", emoji: "🍊", calories: 62, protein: 1.2, carbs: 15, fat: 0.2, fiber: 3.1, serving: "1 medium (131g)", category: "fruit" },
    { name: "Strawberries", emoji: "🍓", calories: 49, protein: 1, carbs: 12, fat: 0.5, fiber: 3, serving: "1 cup (152g)", category: "fruit" },
    { name: "Blueberries", emoji: "🫐", calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6, serving: "1 cup (148g)", category: "fruit" },
    { name: "Mango", emoji: "🥭", calories: 99, protein: 1.4, carbs: 25, fat: 0.6, fiber: 2.6, serving: "1 cup (165g)", category: "fruit" },
    { name: "Grapes", emoji: "🍇", calories: 104, protein: 1.1, carbs: 27, fat: 0.2, fiber: 1.4, serving: "1 cup (151g)", category: "fruit" },
    { name: "Watermelon", emoji: "🍉", calories: 46, protein: 0.9, carbs: 11.5, fat: 0.2, fiber: 0.6, serving: "1 cup (154g)", category: "fruit" },
    { name: "Pineapple", emoji: "🍍", calories: 82, protein: 0.9, carbs: 22, fat: 0.2, fiber: 2.3, serving: "1 cup (165g)", category: "fruit" },
    { name: "Avocado", emoji: "🥑", calories: 234, protein: 2.9, carbs: 12.5, fat: 21, fiber: 9.8, serving: "1 medium (150g)", category: "fruit" },
    { name: "Kiwi", emoji: "🥝", calories: 42, protein: 0.8, carbs: 10, fat: 0.4, fiber: 2.1, serving: "1 medium (69g)", category: "fruit" },
    { name: "Papaya", emoji: "🍈", calories: 62, protein: 0.7, carbs: 16, fat: 0.4, fiber: 2.5, serving: "1 cup (145g)", category: "fruit" },

    // Vegetables
    { name: "Broccoli", emoji: "🥦", calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, serving: "1 cup (156g)", category: "vegetable" },
    { name: "Spinach", emoji: "🥬", calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, serving: "1 cup raw (30g)", category: "vegetable" },
    { name: "Carrot", emoji: "🥕", calories: 25, protein: 0.6, carbs: 6, fat: 0.1, fiber: 1.7, serving: "1 medium (61g)", category: "vegetable" },
    { name: "Sweet Potato", emoji: "🍠", calories: 103, protein: 2.3, carbs: 24, fat: 0.1, fiber: 3.8, serving: "1 medium (114g)", category: "vegetable" },
    { name: "Bell Pepper", emoji: "🫑", calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5, serving: "1 medium (119g)", category: "vegetable" },
    { name: "Tomato", emoji: "🍅", calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, fiber: 1.5, serving: "1 medium (123g)", category: "vegetable" },
    { name: "Cucumber", emoji: "🥒", calories: 16, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5, serving: "1 cup (119g)", category: "vegetable" },
    { name: "Cauliflower", emoji: "🌿", calories: 25, protein: 1.9, carbs: 5.3, fat: 0.3, fiber: 2, serving: "1 cup (100g)", category: "vegetable" },
    { name: "Asparagus", emoji: "🌱", calories: 27, protein: 2.9, carbs: 5.2, fat: 0.2, fiber: 2.8, serving: "1 cup (134g)", category: "vegetable" },
    { name: "Mushrooms", emoji: "🍄", calories: 15, protein: 2.2, carbs: 2.3, fat: 0.2, fiber: 0.7, serving: "1 cup (70g)", category: "vegetable" },

    // Proteins
    { name: "Chicken Breast", emoji: "🍗", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, serving: "100g cooked", category: "protein" },
    { name: "Salmon", emoji: "🐟", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, serving: "100g cooked", category: "protein" },
    { name: "Egg", emoji: "🥚", calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8, fiber: 0, serving: "1 large (50g)", category: "protein" },
    { name: "Turkey Breast", emoji: "🦃", calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0, serving: "100g cooked", category: "protein" },
    { name: "Tuna", emoji: "🐠", calories: 132, protein: 28, carbs: 0, fat: 1.3, fiber: 0, serving: "100g canned", category: "protein" },
    { name: "Tofu", emoji: "🧊", calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, serving: "100g", category: "protein" },
    { name: "Greek Yogurt", emoji: "🥛", calories: 100, protein: 17, carbs: 6, fat: 0.7, fiber: 0, serving: "1 cup (170g)", category: "protein" },
    { name: "Cottage Cheese", emoji: "🧀", calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, serving: "100g", category: "protein" },
    { name: "Shrimp", emoji: "🦐", calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, serving: "100g cooked", category: "protein" },
    { name: "Beef Steak (Lean)", emoji: "🥩", calories: 271, protein: 26, carbs: 0, fat: 18, fiber: 0, serving: "100g cooked", category: "protein" },
    { name: "Paneer", emoji: "🧈", calories: 265, protein: 18, carbs: 1.2, fat: 21, fiber: 0, serving: "100g", category: "protein" },
    { name: "Lentils (Dal)", emoji: "🍲", calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, serving: "100g cooked", category: "protein" },
    { name: "Chickpeas", emoji: "🫘", calories: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, serving: "100g cooked", category: "protein" },

    // Grains & Carbs
    { name: "Brown Rice", emoji: "🍚", calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, serving: "1 cup cooked (195g)", category: "grain" },
    { name: "White Rice", emoji: "🍚", calories: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, serving: "1 cup cooked (186g)", category: "grain" },
    { name: "Oatmeal", emoji: "🥣", calories: 154, protein: 5, carbs: 27, fat: 2.6, fiber: 4, serving: "1 cup cooked (234g)", category: "grain" },
    { name: "Whole Wheat Bread", emoji: "🍞", calories: 69, protein: 3.6, carbs: 12, fat: 1, fiber: 1.9, serving: "1 slice (28g)", category: "grain" },
    { name: "Quinoa", emoji: "🌾", calories: 222, protein: 8.1, carbs: 39, fat: 3.6, fiber: 5.2, serving: "1 cup cooked (185g)", category: "grain" },
    { name: "Pasta", emoji: "🍝", calories: 220, protein: 8, carbs: 43, fat: 1.3, fiber: 2.5, serving: "1 cup cooked (140g)", category: "grain" },
    { name: "Roti / Chapati", emoji: "🫓", calories: 104, protein: 3.1, carbs: 18, fat: 3.4, fiber: 1.9, serving: "1 medium (40g)", category: "grain" },
    { name: "Poha", emoji: "🍛", calories: 180, protein: 3.5, carbs: 32, fat: 5, fiber: 1.2, serving: "1 serving (150g)", category: "grain" },

    // Dairy
    { name: "Milk (Whole)", emoji: "🥛", calories: 149, protein: 8, carbs: 12, fat: 8, fiber: 0, serving: "1 cup (244ml)", category: "dairy" },
    { name: "Milk (Skim)", emoji: "🥛", calories: 83, protein: 8, carbs: 12, fat: 0.2, fiber: 0, serving: "1 cup (244ml)", category: "dairy" },
    { name: "Cheddar Cheese", emoji: "🧀", calories: 113, protein: 7, carbs: 0.4, fat: 9.3, fiber: 0, serving: "1 slice (28g)", category: "dairy" },
    { name: "Butter", emoji: "🧈", calories: 102, protein: 0.1, carbs: 0, fat: 11.5, fiber: 0, serving: "1 tablespoon (14g)", category: "dairy" },

    // Nuts & Seeds
    { name: "Almonds", emoji: "🌰", calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, serving: "1 oz (28g)", category: "nuts" },
    { name: "Walnuts", emoji: "🌰", calories: 185, protein: 4.3, carbs: 3.9, fat: 18.5, fiber: 1.9, serving: "1 oz (28g)", category: "nuts" },
    { name: "Peanut Butter", emoji: "🥜", calories: 188, protein: 8, carbs: 6, fat: 16, fiber: 2, serving: "2 tablespoons (32g)", category: "nuts" },
    { name: "Chia Seeds", emoji: "🌱", calories: 137, protein: 4.4, carbs: 12, fat: 8.6, fiber: 10.6, serving: "1 oz (28g)", category: "nuts" },
    { name: "Flax Seeds", emoji: "🌱", calories: 150, protein: 5.1, carbs: 8.1, fat: 12, fiber: 7.6, serving: "1 oz (28g)", category: "nuts" },

    // Snacks & Others
    { name: "Dark Chocolate (70%)", emoji: "🍫", calories: 170, protein: 2.2, carbs: 13, fat: 12, fiber: 3, serving: "1 oz (28g)", category: "snack" },
    { name: "Honey", emoji: "🍯", calories: 64, protein: 0.1, carbs: 17, fat: 0, fiber: 0, serving: "1 tablespoon (21g)", category: "snack" },
    { name: "Protein Bar", emoji: "🍫", calories: 210, protein: 20, carbs: 22, fat: 8, fiber: 3, serving: "1 bar (60g)", category: "snack" },
    { name: "Trail Mix", emoji: "🥜", calories: 175, protein: 5, carbs: 15, fat: 12, fiber: 2, serving: "1 oz (28g)", category: "snack" },
    { name: "Smoothie Bowl", emoji: "🥣", calories: 280, protein: 8, carbs: 45, fat: 6, fiber: 5, serving: "1 bowl (300g)", category: "snack" },

    // Drinks
    { name: "Black Coffee", emoji: "☕", calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, serving: "1 cup (240ml)", category: "drink" },
    { name: "Green Tea", emoji: "🍵", calories: 2, protein: 0, carbs: 0.5, fat: 0, fiber: 0, serving: "1 cup (240ml)", category: "drink" },
    { name: "Orange Juice", emoji: "🧃", calories: 112, protein: 1.7, carbs: 26, fat: 0.5, fiber: 0.5, serving: "1 cup (248ml)", category: "drink" },
    { name: "Coconut Water", emoji: "🥥", calories: 46, protein: 1.7, carbs: 9, fat: 0.5, fiber: 2.6, serving: "1 cup (240ml)", category: "drink" },
    { name: "Protein Shake", emoji: "🥤", calories: 150, protein: 25, carbs: 8, fat: 2, fiber: 1, serving: "1 scoop + water", category: "drink" },
    { name: "Lassi (Sweet)", emoji: "🥛", calories: 150, protein: 5, carbs: 20, fat: 5, fiber: 0, serving: "1 glass (200ml)", category: "drink" },

    // Indian Foods
    { name: "Idli", emoji: "🍘", calories: 39, protein: 1.5, carbs: 8, fat: 0.1, fiber: 0.3, serving: "1 piece (30g)", category: "grain" },
    { name: "Dosa", emoji: "🫓", calories: 120, protein: 3, carbs: 18, fat: 3.7, fiber: 0.8, serving: "1 medium (60g)", category: "grain" },
    { name: "Samosa", emoji: "🥟", calories: 262, protein: 4, carbs: 30, fat: 14, fiber: 2, serving: "1 piece (100g)", category: "snack" },
    { name: "Biryani (Chicken)", emoji: "🍛", calories: 350, protein: 18, carbs: 40, fat: 12, fiber: 2, serving: "1 serving (250g)", category: "grain" },
    { name: "Rajma (Kidney Bean Curry)", emoji: "🍲", calories: 140, protein: 7, carbs: 22, fat: 2.5, fiber: 5, serving: "1 serving (150g)", category: "protein" },
    { name: "Palak Paneer", emoji: "🥘", calories: 220, protein: 12, carbs: 8, fat: 16, fiber: 3, serving: "1 serving (200g)", category: "protein" },
    { name: "Chole (Chickpea Curry)", emoji: "🍛", calories: 180, protein: 8, carbs: 25, fat: 6, fiber: 6, serving: "1 serving (200g)", category: "protein" },
    { name: "Upma", emoji: "🥣", calories: 190, protein: 4.5, carbs: 28, fat: 7, fiber: 2, serving: "1 serving (200g)", category: "grain" },
    { name: "Paratha", emoji: "🫓", calories: 200, protein: 4, carbs: 26, fat: 9, fiber: 1.5, serving: "1 medium (80g)", category: "grain" },
    { name: "Khichdi", emoji: "🍛", calories: 160, protein: 5, carbs: 28, fat: 3, fiber: 2, serving: "1 serving (200g)", category: "grain" },
];

const EXERCISE_DATABASE = [
    // CHEST
    { name: "Barbell Bench Press", bodyPart: "chest", difficulty: "intermediate", equipment: "Barbell, Bench", musclesWorked: ["Pectorals", "Triceps", "Front Deltoids"], caloriesBurn: "7-10 cal/min", sets: "4", reps: "8-12", description: "The king of chest exercises. Lie on a flat bench, grip the barbell slightly wider than shoulder-width, lower to chest and press up.", steps: ["Lie flat on bench with feet planted", "Grip barbell slightly wider than shoulders", "Unrack and lower bar to mid-chest", "Press the bar back up to lockout", "Keep shoulder blades retracted throughout"] },
    { name: "Incline Dumbbell Press", bodyPart: "chest", difficulty: "intermediate", equipment: "Dumbbells, Incline Bench", musclesWorked: ["Upper Chest", "Front Deltoids", "Triceps"], caloriesBurn: "6-9 cal/min", sets: "3-4", reps: "10-12", description: "Targets the upper chest. Set bench to 30-45 degrees and press dumbbells upward.", steps: ["Set bench to 30-45 degree incline", "Hold dumbbells at shoulder level", "Press up and slightly inward", "Lower with control to shoulder level", "Maintain arch in lower back"] },
    { name: "Push-Ups", bodyPart: "chest", difficulty: "beginner", equipment: "None (Bodyweight)", musclesWorked: ["Pectorals", "Triceps", "Core"], caloriesBurn: "7-10 cal/min", sets: "3-4", reps: "15-25", description: "Classic bodyweight exercise. Great for building chest, triceps, and core strength anywhere.", steps: ["Start in high plank position", "Hands slightly wider than shoulders", "Lower chest to ground with elbows at 45°", "Push back up to starting position", "Keep core tight and body straight"] },
    { name: "Dumbbell Flyes", bodyPart: "chest", difficulty: "intermediate", equipment: "Dumbbells, Flat Bench", musclesWorked: ["Pectorals", "Front Deltoids"], caloriesBurn: "5-7 cal/min", sets: "3", reps: "12-15", description: "Isolation exercise that stretches and contracts the chest muscles through a wide arc.", steps: ["Lie on flat bench with dumbbells above chest", "Slight bend in elbows throughout", "Lower arms out to sides in wide arc", "Feel deep stretch in chest", "Squeeze chest to bring dumbbells back up"] },
    { name: "Cable Crossover", bodyPart: "chest", difficulty: "intermediate", equipment: "Cable Machine", musclesWorked: ["Pectorals", "Front Deltoids"], caloriesBurn: "5-7 cal/min", sets: "3-4", reps: "12-15", description: "Great for chest isolation and constant tension. Bring cables together in front of your body.", steps: ["Set cables above head height", "Step forward into split stance", "Pull handles down and together", "Squeeze at the center", "Control the return slowly"] },
    { name: "Chest Dips", bodyPart: "chest", difficulty: "advanced", equipment: "Parallel Bars", musclesWorked: ["Lower Chest", "Triceps", "Front Deltoids"], caloriesBurn: "8-11 cal/min", sets: "3-4", reps: "8-12", description: "Advanced compound movement. Lean forward to target chest more than triceps.", steps: ["Grip parallel bars and lift body", "Lean torso forward 30 degrees", "Lower body until upper arms parallel to floor", "Press back up explosively", "Keep forward lean throughout"] },

    // BACK
    { name: "Deadlift", bodyPart: "back", difficulty: "advanced", equipment: "Barbell", musclesWorked: ["Erector Spinae", "Glutes", "Hamstrings", "Traps"], caloriesBurn: "10-15 cal/min", sets: "4-5", reps: "5-8", description: "The ultimate full-body strength builder. Lifts the barbell from the ground to hip level.", steps: ["Stand with feet hip-width, bar over mid-foot", "Hinge at hips and grip bar outside knees", "Brace core and flatten back", "Drive through heels, extending hips and knees", "Lock out at the top, squeeze glutes"] },
    { name: "Pull-Ups", bodyPart: "back", difficulty: "intermediate", equipment: "Pull-up Bar", musclesWorked: ["Latissimus Dorsi", "Biceps", "Rhomboids"], caloriesBurn: "8-12 cal/min", sets: "3-4", reps: "6-12", description: "Gold standard for back development. Grip the bar and pull your chin above it.", steps: ["Hang from bar with overhand grip", "Engage lats by pulling shoulder blades down", "Pull chin above bar level", "Lower with control to full extension", "Avoid swinging or kipping"] },
    { name: "Bent-Over Barbell Row", bodyPart: "back", difficulty: "intermediate", equipment: "Barbell", musclesWorked: ["Latissimus Dorsi", "Rhomboids", "Rear Deltoids", "Biceps"], caloriesBurn: "7-10 cal/min", sets: "4", reps: "8-12", description: "Builds a thick, powerful back. Row the barbell to your lower chest.", steps: ["Hinge forward at hips ~45 degrees", "Grip bar slightly wider than shoulders", "Pull bar to lower chest/upper abs", "Squeeze shoulder blades together", "Lower with control"] },
    { name: "Lat Pulldown", bodyPart: "back", difficulty: "beginner", equipment: "Cable Machine", musclesWorked: ["Latissimus Dorsi", "Biceps", "Teres Major"], caloriesBurn: "5-8 cal/min", sets: "3-4", reps: "10-12", description: "Great alternative to pull-ups. Pull the bar down to your upper chest.", steps: ["Sit and grip bar wider than shoulders", "Lean back slightly", "Pull bar to upper chest", "Squeeze lats at bottom", "Control the bar back up"] },
    { name: "Seated Cable Row", bodyPart: "back", difficulty: "beginner", equipment: "Cable Machine, V-Bar", musclesWorked: ["Mid Back", "Rhomboids", "Biceps"], caloriesBurn: "5-7 cal/min", sets: "3-4", reps: "10-12", description: "Targets mid-back thickness. Sit upright and row the handle to your abdomen.", steps: ["Sit with feet on platform, knees slightly bent", "Grab V-bar handle", "Pull handle to lower abdomen", "Squeeze shoulder blades together", "Extend arms forward with control"] },
    { name: "Face Pulls", bodyPart: "back", difficulty: "beginner", equipment: "Cable Machine, Rope", musclesWorked: ["Rear Deltoids", "Rhomboids", "Rotator Cuff"], caloriesBurn: "4-6 cal/min", sets: "3-4", reps: "15-20", description: "Essential for shoulder health and rear delt development.", steps: ["Set cable at face height", "Grip rope with overhand grip", "Pull towards face, separating hands", "Externally rotate at peak", "Squeeze rear delts and return"] },

    // SHOULDERS
    { name: "Overhead Press", bodyPart: "shoulders", difficulty: "intermediate", equipment: "Barbell or Dumbbells", musclesWorked: ["Front Deltoids", "Side Deltoids", "Triceps"], caloriesBurn: "6-9 cal/min", sets: "4", reps: "8-10", description: "The foundational shoulder builder. Press weight overhead from shoulder height.", steps: ["Stand with feet shoulder-width", "Hold bar/dumbbells at shoulder level", "Brace core tightly", "Press weight overhead to lockout", "Lower with control to shoulders"] },
    { name: "Lateral Raises", bodyPart: "shoulders", difficulty: "beginner", equipment: "Dumbbells", musclesWorked: ["Side Deltoids"], caloriesBurn: "4-6 cal/min", sets: "3-4", reps: "12-15", description: "Isolation movement for wider-looking shoulders. Raise dumbbells out to the sides.", steps: ["Stand with dumbbells at sides", "Slight bend in elbows", "Raise arms out to sides until parallel", "Lead with elbows, not wrists", "Lower slowly with control"] },
    { name: "Front Raises", bodyPart: "shoulders", difficulty: "beginner", equipment: "Dumbbells", musclesWorked: ["Front Deltoids"], caloriesBurn: "4-6 cal/min", sets: "3", reps: "12-15", description: "Targets the front deltoid. Raise dumbbells in front of your body to shoulder height.", steps: ["Stand with dumbbells in front of thighs", "Raise one or both arms forward", "Stop at shoulder height", "Lower with control", "Alternate arms or do simultaneously"] },
    { name: "Arnold Press", bodyPart: "shoulders", difficulty: "intermediate", equipment: "Dumbbells", musclesWorked: ["All Deltoid Heads", "Triceps"], caloriesBurn: "6-8 cal/min", sets: "3-4", reps: "10-12", description: "Made famous by Arnold. Combines a rotation with overhead pressing.", steps: ["Start with palms facing you at chin level", "Press up while rotating palms outward", "Finish with palms facing forward at top", "Reverse the motion on the way down", "Smooth continuous rotation throughout"] },
    { name: "Reverse Pec Deck", bodyPart: "shoulders", difficulty: "beginner", equipment: "Pec Deck Machine", musclesWorked: ["Rear Deltoids", "Rhomboids"], caloriesBurn: "4-5 cal/min", sets: "3-4", reps: "12-15", description: "Isolates the rear deltoids. Sit facing the pad and push handles backward.", steps: ["Sit facing machine pad", "Grip handles at shoulder height", "Push handles back in wide arc", "Squeeze rear delts at peak", "Return slowly to start"] },

    // ARMS
    { name: "Barbell Curl", bodyPart: "arms", difficulty: "beginner", equipment: "Barbell / EZ Bar", musclesWorked: ["Biceps Brachii", "Brachialis"], caloriesBurn: "4-6 cal/min", sets: "3-4", reps: "10-12", description: "Classic bicep builder. Curl the barbell up with a supinated grip.", steps: ["Stand with shoulder-width grip on barbell", "Keep elbows pinned to sides", "Curl weight up squeezing biceps", "Lower slowly to full extension", "Avoid swinging the body"] },
    { name: "Tricep Dips", bodyPart: "arms", difficulty: "intermediate", equipment: "Parallel Bars or Bench", musclesWorked: ["Triceps", "Chest", "Front Deltoids"], caloriesBurn: "6-8 cal/min", sets: "3-4", reps: "10-15", description: "Excellent compound movement for triceps. Keep torso upright to focus triceps.", steps: ["Grip bars and lift body upright", "Keep torso vertical (not leaning)", "Lower until upper arms parallel", "Press back to lockout", "Keep elbows tucked"] },
    { name: "Hammer Curls", bodyPart: "arms", difficulty: "beginner", equipment: "Dumbbells", musclesWorked: ["Brachialis", "Biceps", "Forearms"], caloriesBurn: "4-6 cal/min", sets: "3", reps: "10-12", description: "Neutral grip curls that build arm thickness and forearm strength.", steps: ["Hold dumbbells with neutral (hammer) grip", "Keep elbows at sides", "Curl weights up together or alternating", "Squeeze at the top", "Lower with control"] },
    { name: "Tricep Pushdown", bodyPart: "arms", difficulty: "beginner", equipment: "Cable Machine", musclesWorked: ["Triceps (all heads)"], caloriesBurn: "4-5 cal/min", sets: "3-4", reps: "12-15", description: "Isolation exercise for all three tricep heads. Push the cable attachment down.", steps: ["Set cable at high position", "Grip bar or rope attachment", "Press down until arms fully extended", "Squeeze triceps at bottom", "Control the return to start"] },
    { name: "Preacher Curls", bodyPart: "arms", difficulty: "intermediate", equipment: "Preacher Bench, EZ Bar", musclesWorked: ["Biceps (short head)"], caloriesBurn: "4-5 cal/min", sets: "3", reps: "10-12", description: "Eliminates cheating for strict bicep isolation. Uses the preacher bench.", steps: ["Sit at preacher bench, arms over pad", "Grip EZ bar with underhand grip", "Curl bar up squeezing biceps", "Lower until arms nearly straight", "Do not bounce at the bottom"] },
    { name: "Skull Crushers", bodyPart: "arms", difficulty: "intermediate", equipment: "EZ Bar, Flat Bench", musclesWorked: ["Triceps (long head)"], caloriesBurn: "5-6 cal/min", sets: "3", reps: "10-12", description: "Lying tricep extension. Lower the bar to your forehead, then extend back up.", steps: ["Lie flat holding EZ bar overhead", "Keep upper arms vertical", "Lower bar toward forehead/behind head", "Extend elbows to press bar up", "Keep elbows pointed at ceiling"] },

    // LEGS
    { name: "Barbell Squat", bodyPart: "legs", difficulty: "intermediate", equipment: "Barbell, Squat Rack", musclesWorked: ["Quadriceps", "Glutes", "Hamstrings", "Core"], caloriesBurn: "8-12 cal/min", sets: "4-5", reps: "6-10", description: "The king of all exercises. Builds total lower body strength and mass.", steps: ["Bar on upper back, feet shoulder-width", "Brace core, chest up", "Descend by pushing hips back", "Go to parallel or below", "Drive up through heels"] },
    { name: "Leg Press", bodyPart: "legs", difficulty: "beginner", equipment: "Leg Press Machine", musclesWorked: ["Quadriceps", "Glutes", "Hamstrings"], caloriesBurn: "7-10 cal/min", sets: "3-4", reps: "10-12", description: "Machine-based squat alternative. Place feet on platform and push.", steps: ["Sit in machine with back flat", "Place feet shoulder-width on platform", "Release safety and lower weight", "Push through heels to extend legs", "Don't lock out knees fully"] },
    { name: "Romanian Deadlift", bodyPart: "legs", difficulty: "intermediate", equipment: "Barbell or Dumbbells", musclesWorked: ["Hamstrings", "Glutes", "Erector Spinae"], caloriesBurn: "7-10 cal/min", sets: "3-4", reps: "8-12", description: "Best hamstring exercise. Hinge at hips with slight knee bend.", steps: ["Hold bar at hip level, feet hip-width", "Push hips back, slight knee bend", "Lower bar along legs feeling hamstring stretch", "Stop when torso is near parallel", "Drive hips forward to stand"] },
    { name: "Walking Lunges", bodyPart: "legs", difficulty: "beginner", equipment: "Dumbbells (optional)", musclesWorked: ["Quadriceps", "Glutes", "Hamstrings"], caloriesBurn: "6-9 cal/min", sets: "3", reps: "12-16 steps", description: "Dynamic leg exercise that builds unilateral strength and balance.", steps: ["Stand tall with or without weights", "Step forward into lunge", "Lower back knee toward floor", "Drive through front heel to stand", "Step forward with other leg"] },
    { name: "Leg Curls", bodyPart: "legs", difficulty: "beginner", equipment: "Leg Curl Machine", musclesWorked: ["Hamstrings"], caloriesBurn: "4-6 cal/min", sets: "3-4", reps: "12-15", description: "Isolation exercise for hamstrings. Curl the pad toward your glutes.", steps: ["Lie face down on machine", "Pad behind ankles", "Curl weight up toward glutes", "Squeeze hamstrings at top", "Lower with control"] },
    { name: "Calf Raises", bodyPart: "legs", difficulty: "beginner", equipment: "Machine or Bodyweight", musclesWorked: ["Gastrocnemius", "Soleus"], caloriesBurn: "3-5 cal/min", sets: "4", reps: "15-20", description: "Builds calf size and strength. Rise up onto your toes.", steps: ["Stand on edge of step or machine", "Lower heels below platform", "Rise up onto toes as high as possible", "Squeeze at the top for 2 seconds", "Lower slowly with full stretch"] },
    { name: "Bulgarian Split Squat", bodyPart: "legs", difficulty: "intermediate", equipment: "Dumbbells, Bench", musclesWorked: ["Quadriceps", "Glutes", "Hamstrings"], caloriesBurn: "7-9 cal/min", sets: "3-4", reps: "10-12 each leg", description: "Advanced single-leg exercise. Rear foot elevated on bench.", steps: ["Stand with rear foot on bench behind you", "Hold dumbbells at sides", "Lower back knee toward floor", "Keep front knee tracking over toes", "Drive through front foot to stand"] },

    // CORE
    { name: "Plank", bodyPart: "core", difficulty: "beginner", equipment: "None", musclesWorked: ["Rectus Abdominis", "Transverse Abdominis", "Obliques"], caloriesBurn: "3-5 cal/min", sets: "3-4", reps: "30-60 sec", description: "Isometric core exercise. Hold a straight body position on forearms.", steps: ["Start on forearms and toes", "Body in straight line from head to heels", "Engage core, don't let hips sag", "Keep breathing normally", "Hold for prescribed time"] },
    { name: "Bicycle Crunches", bodyPart: "core", difficulty: "beginner", equipment: "None", musclesWorked: ["Rectus Abdominis", "Obliques"], caloriesBurn: "5-7 cal/min", sets: "3", reps: "20-30", description: "Dynamic crunch targeting abs and obliques. Alternate elbow to opposite knee.", steps: ["Lie on back, hands behind head", "Lift shoulders off ground", "Bring right elbow to left knee", "Extend right leg straight", "Alternate sides in pedaling motion"] },
    { name: "Russian Twists", bodyPart: "core", difficulty: "intermediate", equipment: "Medicine Ball (optional)", musclesWorked: ["Obliques", "Rectus Abdominis"], caloriesBurn: "5-7 cal/min", sets: "3-4", reps: "20-30", description: "Rotational core exercise. Sit back and twist torso side to side.", steps: ["Sit with knees bent, lean back 45°", "Lift feet off ground (advanced)", "Hold weight at chest level", "Rotate torso to touch weight to floor", "Alternate sides with control"] },
    { name: "Hanging Leg Raises", bodyPart: "core", difficulty: "advanced", equipment: "Pull-up Bar", musclesWorked: ["Lower Abs", "Hip Flexors", "Obliques"], caloriesBurn: "6-8 cal/min", sets: "3-4", reps: "10-15", description: "Advanced ab exercise. Hang from bar and raise legs to parallel or higher.", steps: ["Hang from bar with overhand grip", "Keep arms straight", "Raise legs to parallel or higher", "Control the descent, don't swing", "Engage core throughout"] },
    { name: "Ab Wheel Rollout", bodyPart: "core", difficulty: "advanced", equipment: "Ab Wheel", musclesWorked: ["Rectus Abdominis", "Obliques", "Lower Back"], caloriesBurn: "6-8 cal/min", sets: "3", reps: "8-12", description: "One of the most effective core exercises. Roll wheel out and back.", steps: ["Kneel on mat holding ab wheel", "Brace core extremely tight", "Roll wheel forward extending body", "Go as far as you can with control", "Pull back to starting position using core"] },
    { name: "Dead Bug", bodyPart: "core", difficulty: "beginner", equipment: "None", musclesWorked: ["Deep Core", "Transverse Abdominis"], caloriesBurn: "3-5 cal/min", sets: "3", reps: "10-12 each side", description: "Excellent core stability exercise. Lie on back and extend opposite arm and leg.", steps: ["Lie on back, arms pointing up", "Knees bent at 90 degrees over hips", "Slowly extend right arm and left leg", "Keep lower back pressed into floor", "Return and alternate sides"] },
    { name: "Mountain Climbers", bodyPart: "core", difficulty: "beginner", equipment: "None", musclesWorked: ["Core", "Hip Flexors", "Shoulders"], caloriesBurn: "8-12 cal/min", sets: "3-4", reps: "30-45 sec", description: "Dynamic cardio-core exercise. Drive knees toward chest rapidly in plank.", steps: ["Start in high plank position", "Drive right knee toward chest", "Quickly switch legs", "Keep hips level, don't bounce", "Maintain fast, controlled pace"] },

    // CARDIO
    { name: "Running", bodyPart: "cardio", difficulty: "beginner", equipment: "None / Treadmill", musclesWorked: ["Full Body", "Heart", "Lungs"], caloriesBurn: "10-15 cal/min", sets: "1", reps: "20-45 min", description: "Classic cardiovascular exercise. Improves heart health, endurance, and burns fat.", steps: ["Warm up with 5 min walking", "Start at comfortable pace", "Maintain upright posture", "Land on mid-foot, not heel", "Cool down with walking"] },
    { name: "Jump Rope", bodyPart: "cardio", difficulty: "beginner", equipment: "Jump Rope", musclesWorked: ["Calves", "Shoulders", "Core", "Heart"], caloriesBurn: "12-16 cal/min", sets: "5-6", reps: "1-3 min rounds", description: "Incredible full-body cardio. Burns more calories per minute than most exercises.", steps: ["Hold handles at hip level", "Jump with both feet, small bounces", "Turn rope with wrists, not arms", "Land softly on balls of feet", "Start with 30-sec intervals"] },
    { name: "Cycling", bodyPart: "cardio", difficulty: "beginner", equipment: "Bike / Stationary Bike", musclesWorked: ["Quadriceps", "Hamstrings", "Calves", "Heart"], caloriesBurn: "8-14 cal/min", sets: "1", reps: "20-60 min", description: "Low-impact cardio that builds leg endurance. Great for joint-friendly exercise.", steps: ["Adjust seat to proper height", "Maintain cadence of 60-90 RPM", "Mix steady-state and intervals", "Keep core engaged", "Don't bounce in the saddle"] },
    { name: "Burpees", bodyPart: "cardio", difficulty: "intermediate", equipment: "None", musclesWorked: ["Full Body"], caloriesBurn: "10-14 cal/min", sets: "3-5", reps: "10-15", description: "Full-body explosive exercise combining squat, plank, push-up, and jump.", steps: ["Stand, then squat down", "Kick feet back into plank", "Do a push-up", "Jump feet forward to hands", "Explode up into jump with arms overhead"] },
    { name: "Swimming", bodyPart: "cardio", difficulty: "beginner", equipment: "Pool", musclesWorked: ["Full Body", "Heart", "Lungs"], caloriesBurn: "8-14 cal/min", sets: "1", reps: "20-45 min", description: "Zero-impact full-body workout. Amazing for joints and overall fitness.", steps: ["Warm up with easy laps", "Mix different strokes", "Focus on breathing technique", "Include interval sets", "Cool down with easy backstroke"] },
    { name: "HIIT Training", bodyPart: "cardio", difficulty: "advanced", equipment: "Various or None", musclesWorked: ["Full Body", "Heart"], caloriesBurn: "12-20 cal/min", sets: "4-8", reps: "20s work / 10s rest", description: "High-Intensity Interval Training. Maximum calorie burn in minimum time.", steps: ["Choose 4-6 exercises", "Perform each at maximum intensity for 20-40 sec", "Rest 10-20 sec between exercises", "Complete 4-8 rounds", "Total workout: 15-25 min"] },
    { name: "Rowing Machine", bodyPart: "cardio", difficulty: "beginner", equipment: "Rowing Machine", musclesWorked: ["Back", "Legs", "Arms", "Core"], caloriesBurn: "8-12 cal/min", sets: "1", reps: "15-30 min", description: "Full-body cardio that builds strength. Great for posture and back strength.", steps: ["Sit tall, grip handle overhand", "Drive with legs first", "Lean back slightly, pull to ribs", "Extend arms, lean forward, bend knees", "Maintain fluid, continuous motion"] },
    { name: "Stair Climbing", bodyPart: "cardio", difficulty: "beginner", equipment: "Stairs / Stair Machine", musclesWorked: ["Quadriceps", "Glutes", "Calves", "Heart"], caloriesBurn: "8-12 cal/min", sets: "1", reps: "15-30 min", description: "Functional cardio that builds lower body power. Take stairs two at a time for extra challenge.", steps: ["Start at moderate pace", "Use full foot on each step", "Pump arms naturally", "Don't lean on handrails", "Increase speed for intervals"] },
];

// Diet Plans
const DIET_PLANS = {
    lose: {
        title: "Weight Loss Plan",
        totalCal: 1600,
        meals: [
            {
                name: "Breakfast",
                icon: "🌅",
                time: "7:00 - 8:00 AM",
                items: [
                    { name: "Oatmeal with berries", cal: 200 },
                    { name: "Boiled Eggs (2)", cal: 144 },
                    { name: "Green Tea", cal: 2 }
                ]
            },
            {
                name: "Lunch",
                icon: "☀️",
                time: "12:00 - 1:00 PM",
                items: [
                    { name: "Grilled Chicken Salad", cal: 350 },
                    { name: "Brown Rice (½ cup)", cal: 108 },
                    { name: "Cucumber Raita", cal: 50 }
                ]
            },
            {
                name: "Snack",
                icon: "🍎",
                time: "4:00 - 4:30 PM",
                items: [
                    { name: "Greek Yogurt", cal: 100 },
                    { name: "Almonds (10 pcs)", cal: 70 }
                ]
            },
            {
                name: "Dinner",
                icon: "🌙",
                time: "7:00 - 8:00 PM",
                items: [
                    { name: "Grilled Salmon (100g)", cal: 208 },
                    { name: "Steamed Broccoli", cal: 55 },
                    { name: "Sweet Potato", cal: 103 }
                ]
            }
        ],
        macros: { protein: 120, carbs: 150, fat: 45, fiber: 30 }
    },
    maintain: {
        title: "Maintenance Plan",
        totalCal: 2200,
        meals: [
            {
                name: "Breakfast",
                icon: "🌅",
                time: "7:00 - 8:00 AM",
                items: [
                    { name: "Whole Wheat Toast (2)", cal: 138 },
                    { name: "Peanut Butter", cal: 188 },
                    { name: "Banana", cal: 105 },
                    { name: "Coffee with Milk", cal: 40 }
                ]
            },
            {
                name: "Lunch",
                icon: "☀️",
                time: "12:00 - 1:00 PM",
                items: [
                    { name: "Chicken Biryani", cal: 350 },
                    { name: "Mixed Salad", cal: 45 },
                    { name: "Yogurt", cal: 60 }
                ]
            },
            {
                name: "Snack",
                icon: "🍎",
                time: "4:00 - 5:00 PM",
                items: [
                    { name: "Protein Bar", cal: 210 },
                    { name: "Apple", cal: 95 }
                ]
            },
            {
                name: "Dinner",
                icon: "🌙",
                time: "7:00 - 8:30 PM",
                items: [
                    { name: "Dal with 2 Roti", cal: 324 },
                    { name: "Palak Paneer", cal: 220 },
                    { name: "Brown Rice (½ cup)", cal: 108 }
                ]
            }
        ],
        macros: { protein: 100, carbs: 250, fat: 65, fiber: 28 }
    },
    gain: {
        title: "Muscle Gain Plan",
        totalCal: 2800,
        meals: [
            {
                name: "Breakfast",
                icon: "🌅",
                time: "7:00 - 8:00 AM",
                items: [
                    { name: "Oats with Milk & Banana", cal: 350 },
                    { name: "Eggs (3) Scrambled", cal: 216 },
                    { name: "Whole Wheat Toast", cal: 69 }
                ]
            },
            {
                name: "Lunch",
                icon: "☀️",
                time: "12:00 - 1:00 PM",
                items: [
                    { name: "Chicken Breast (200g)", cal: 330 },
                    { name: "Brown Rice (1 cup)", cal: 216 },
                    { name: "Mixed Vegetables", cal: 80 }
                ]
            },
            {
                name: "Post Workout",
                icon: "💪",
                time: "5:00 - 5:30 PM",
                items: [
                    { name: "Protein Shake (2 scoops)", cal: 300 },
                    { name: "Banana", cal: 105 },
                    { name: "Peanut Butter Toast", cal: 257 }
                ]
            },
            {
                name: "Dinner",
                icon: "🌙",
                time: "8:00 - 9:00 PM",
                items: [
                    { name: "Beef Steak (150g)", cal: 407 },
                    { name: "Quinoa (1 cup)", cal: 222 },
                    { name: "Steamed Asparagus", cal: 27 }
                ]
            }
        ],
        macros: { protein: 180, carbs: 300, fat: 80, fiber: 25 }
    },
    keto: {
        title: "Keto Diet Plan",
        totalCal: 1800,
        meals: [
            {
                name: "Breakfast",
                icon: "🌅",
                time: "8:00 - 9:00 AM",
                items: [
                    { name: "Eggs (3) with Butter", cal: 318 },
                    { name: "Avocado (½)", cal: 117 },
                    { name: "Bacon (2 strips)", cal: 86 }
                ]
            },
            {
                name: "Lunch",
                icon: "☀️",
                time: "12:00 - 1:00 PM",
                items: [
                    { name: "Salmon with Butter Sauce", cal: 350 },
                    { name: "Caesar Salad (no croutons)", cal: 120 },
                    { name: "Olive Oil Dressing", cal: 60 }
                ]
            },
            {
                name: "Snack",
                icon: "🥑",
                time: "3:00 - 4:00 PM",
                items: [
                    { name: "Cheese Cubes (30g)", cal: 120 },
                    { name: "Walnuts (1 oz)", cal: 185 }
                ]
            },
            {
                name: "Dinner",
                icon: "🌙",
                time: "7:00 - 8:00 PM",
                items: [
                    { name: "Paneer Tikka", cal: 265 },
                    { name: "Cauliflower Rice", cal: 25 },
                    { name: "Mushroom Stir-Fry", cal: 80 }
                ]
            }
        ],
        macros: { protein: 90, carbs: 30, fat: 140, fiber: 15 }
    }
};
