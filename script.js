document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const setupSection = document.getElementById('setup-section');
    const comparisonSection = document.getElementById('comparison-section');
    const resultsSection = document.getElementById('results-section');
    const itemsInput = document.getElementById('items-input');
    const startBtn = document.getElementById('start-btn');
    const leftOption = document.getElementById('left-option');
    const rightOption = document.getElementById('right-option');
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const rankingsList = document.getElementById('rankings-list');
    const restartBtn = document.getElementById('restart-btn');
    
    // Variables
    let items = [];
    let comparisons = [];
    let currentComparison = 0;
    let totalComparisons = 0;
    let scores = {};
    
    // Event listeners
    startBtn.addEventListener('click', startRanking);
    leftOption.addEventListener('click', () => selectOption('left'));
    rightOption.addEventListener('click', () => selectOption('right'));
    restartBtn.addEventListener('click', resetApp);
    
    // Functions
    function startRanking() {
        // Get items from input
        items = itemsInput.value.split('\n').filter(item => item.trim() !== '');
        
        if (items.length < 2) {
            alert('Please enter at least 2 items to rank.');
            return;
        }
        
        // Generate all possible pairs for comparison
        generateComparisons();
        
        // Initialize scores
        items.forEach(item => {
            scores[item] = 0;
        });
        
        // Show comparison section
        setupSection.classList.add('hidden');
        comparisonSection.classList.remove('hidden');
        
        // Start the first comparison
        showNextComparison();
    }
    
    function generateComparisons() {
        comparisons = [];
        
        for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
                comparisons.push([items[i], items[j]]);
            }
        }
        
        // Shuffle comparisons for better user experience
        shuffleArray(comparisons);
        
        totalComparisons = comparisons.length;
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function showNextComparison() {
        if (currentComparison < totalComparisons) {
            const pair = comparisons[currentComparison];
            leftOption.textContent = pair[0];
            rightOption.textContent = pair[1];
            
            // Update progress
            progressText.textContent = `Comparison ${currentComparison + 1} of ${totalComparisons}`;
            const progressPercentage = ((currentComparison + 1) / totalComparisons) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        } else {
            // All comparisons are done, show results
            showResults();
        }
    }
    
    function selectOption(choice) {
        const pair = comparisons[currentComparison];
        
        if (choice === 'left') {
            scores[pair[0]]++;
        } else {
            scores[pair[1]]++;
        }
        
        currentComparison++;
        showNextComparison();
    }
    
    function showResults() {
        comparisonSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        // Sort items by score
        const sortedItems = items.sort((a, b) => scores[b] - scores[a]);
        
        // Display rankings
        rankingsList.innerHTML = '';
        sortedItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item} (Score: ${scores[item]})`;
            rankingsList.appendChild(li);
        });
    }
    
    function resetApp() {
        // Reset variables
        items = [];
        comparisons = [];
        currentComparison = 0;
        totalComparisons = 0;
        scores = {};
        
        // Reset UI
        resultsSection.classList.add('hidden');
        setupSection.classList.remove('hidden');
    }
});
