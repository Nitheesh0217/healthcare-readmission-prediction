// Main JavaScript file for Healthcare Readmission Analytics

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add fade-in animation to cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Handle form validation
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            form.classList.add('was-validated');
        }, false);
    });
    
    // Add event listeners for tab changes
    const tabEls = document.querySelectorAll('button[data-bs-toggle="tab"]');
    
    tabEls.forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', function (event) {
            // Resize any charts in the newly shown tab
            if (window.Plotly) {
                const tabContent = document.querySelector(tabEl.getAttribute('data-bs-target'));
                if (tabContent) {
                    const charts = tabContent.querySelectorAll('[id^="chart"], [id$="Chart"]');
                    charts.forEach(chart => {
                        Plotly.relayout(chart, {
                            'autosize': true
                        });
                    });
                }
            }
        });
    });
    
    // Function to format numbers with commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Update counters with animation
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current > target) {
                current = target;
            }
            counter.textContent = numberWithCommas(current);
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        updateCounter();
    });
    
    // Handle risk prediction form submission
    const predictionForm = document.getElementById('predictionForm');
    if (predictionForm) {
        predictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would send the form data to the server
            // For demonstration, we'll simulate a response
            
            // Get form values
            const age = parseInt(document.getElementById('age').value);
            const numDiagnoses = parseInt(document.getElementById('number_diagnoses').value);
            const timeInHospital = parseInt(document.getElementById('time_in_hospital').value);
            const numInpatient = parseInt(document.getElementById('number_inpatient').value);
            
            // Calculate a simple risk score (this would be replaced by the actual model prediction)
            let riskScore = 0;
            
            // Age factor (higher age = higher risk)
            if (age < 30) riskScore += 10;
            else if (age < 50) riskScore += 20;
            else if (age < 70) riskScore += 30;
            else riskScore += 40;
            
            // Number of diagnoses factor
            riskScore += numDiagnoses * 5;
            
            // Time in hospital factor
            riskScore += timeInHospital * 3;
            
            // Number of inpatient visits factor
            riskScore += numInpatient * 10;
            
            // Normalize to 0-100
            riskScore = Math.min(Math.max(riskScore, 0), 100);
            
            // Determine risk level
            let riskLevel, riskColor, prediction;
            if (riskScore < 30) {
                riskLevel = 'Low';
                riskColor = '#4CAF50';
                prediction = 0;
            } else if (riskScore < 60) {
                riskLevel = 'Medium';
                riskColor = '#FFC107';
                prediction = riskScore > 45 ? 1 : 0;
            } else {
                riskLevel = 'High';
                riskColor = '#F44336';
                prediction = 1;
            }
            
            // Determine risk factors
            const riskFactors = [];
            if (age >= 70) riskFactors.push('Advanced age (over 70 years)');
            if (numDiagnoses >= 9) riskFactors.push('High number of diagnoses (9+)');
            if (timeInHospital >= 8) riskFactors.push('Extended hospital stay (8+ days)');
            if (numInpatient >= 2) riskFactors.push('Multiple previous inpatient visits');
            
            // Determine interventions
            const interventions = [];
            if (prediction === 1) {
                interventions.push('Schedule follow-up appointment within 7 days of discharge');
                interventions.push('Provide detailed medication reconciliation and education');
                
                if (numDiagnoses >= 9) {
                    interventions.push('Coordinate care with specialists for multiple conditions');
                }
                
                if (age >= 70) {
                    interventions.push('Arrange home health services for post-discharge support');
                }
                
                if (timeInHospital >= 8) {
                    interventions.push('Implement comprehensive discharge planning with social work consultation');
                }
                
                if (numInpatient >= 2) {
                    interventions.push('Enroll in chronic care management program');
                }
            } else {
                interventions.push('Standard follow-up appointment within 30 days');
                interventions.push('Provide discharge instructions and medication list');
            }
            
            // Simulate response
            const response = {
                prediction: prediction,
                probability: riskScore,
                risk_level: riskLevel,
                risk_color: riskColor,
                risk_factors: riskFactors,
                interventions: interventions
            };
            
            // Update UI with prediction results
            document.getElementById('predictionResult').style.display = 'block';
            document.getElementById('riskLevel').textContent = response.risk_level;
            
            // Update risk alert
            const riskAlert = document.getElementById('riskAlert');
            riskAlert.classList.remove('alert-success', 'alert-warning', 'alert-danger');
            riskAlert.classList.add(response.risk_level === 'Low' ? 'alert-success' : 
                                   (response.risk_level === 'Medium' ? 'alert-warning' : 'alert-danger'));
            
            // Update risk description
            if (response.prediction === 1) {
                document.getElementById('riskDescription').textContent = 
                    `This patient is predicted to be readmitted with a probability of ${response.probability.toFixed(1)}%.`;
            } else {
                document.getElementById('riskDescription').textContent = 
                    `This patient is predicted not to be readmitted with a probability of ${(100 - response.probability).toFixed(1)}%.`;
            }
            
            // Update risk factors list
            const riskFactorsList = document.getElementById('riskFactorsList');
            riskFactorsList.innerHTML = '';
            if (response.risk_factors.length > 0) {
                response.risk_factors.forEach(function(factor) {
                    riskFactorsList.innerHTML += `<li class="list-group-item">${factor}</li>`;
                });
            } else {
                riskFactorsList.innerHTML = '<li class="list-group-item">No significant risk factors identified</li>';
            }
            
            // Update interventions list
            const interventionsList = document.getElementById('interventionsList');
            interventionsList.innerHTML = '';
            if (response.interventions.length > 0) {
                response.interventions.forEach(function(intervention) {
                    interventionsList.innerHTML += `<li class="list-group-item">${intervention}</li>`;
                });
            } else {
                interventionsList.innerHTML = '<li class="list-group-item">No specific interventions recommended</li>';
            }
            
            // Create gauge chart
            const gaugeData = [
                {
                    type: "indicator",
                    mode: "gauge+number",
                    value: response.probability,
                    title: { text: "Readmission Risk (%)" },
                    gauge: {
                        axis: { range: [0, 100] },
                        bar: { color: response.risk_color },
                        steps: [
                            { range: [0, 30], color: "#4CAF50" },
                            { range: [30, 60], color: "#FFC107" },
                            { range: [60, 100], color: "#F44336" }
                        ],
                        threshold: {
                            line: { color: "black", width: 4 },
                            thickness: 0.75,
                            value: response.probability
                        }
                    }
                }
            ];
            
            const gaugeLayout = {
                margin: { t: 25, r: 25, l: 25, b: 25 },
                height: 250
            };
            
            Plotly.newPlot('riskGauge', gaugeData, gaugeLayout);
            
            // Scroll to results
            document.getElementById('predictionResult').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Function to create a sample visualization on the home page
function createSampleVisualization() {
    if (!document.getElementById('sampleVisualization')) return;
    
    const data = [{
        values: [53.91, 46.09],
        labels: ['Not Readmitted', 'Readmitted'],
        type: 'pie',
        marker: {
            colors: ['#4CAF50', '#F44336']
        }
    }];
    
    const layout = {
        margin: {t: 30, b: 30, l: 30, r: 30},
        height: 300
    };
    
    Plotly.newPlot('sampleVisualization', data, layout);
}

// Call the function when the page loads
window.addEventListener('load', createSampleVisualization);
