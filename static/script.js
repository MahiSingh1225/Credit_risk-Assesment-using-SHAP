const form = document.getElementById("riskForm");
const submitBtn = document.getElementById("submitBtn");
const errorNote = document.getElementById("errorNote");

const verdict = document.getElementById("verdict");
const emptyState = document.getElementById("emptyState");

const incomeInput = document.getElementById("person_income");
const amountInput = document.getElementById("loan_amnt");
const percentInput = document.getElementById("loan_percent_income");

const gaugeFill = document.getElementById("gaugeFill");
const probNumber = document.getElementById("probNumber");

const stampBadge = document.getElementById("stampBadge");
const stampText = document.getElementById("stampText");

const factProb = document.getElementById("factProb");
const factThreshold = document.getElementById("factThreshold");
const factResult = document.getElementById("factResult");

const riskMarker = document.getElementById("riskMarker");

const apiDot = document.getElementById("apiDot");
const apiStatusText = document.getElementById("apiStatusText");


// ======================================================
// GAUGE SETTINGS
// ======================================================

const GAUGE_CIRCUMFERENCE = 2 * Math.PI * 92;


// ======================================================
// AUTO CALCULATE LOAN TO INCOME RATIO
// ======================================================

function calculateRatio() {

    const income = parseFloat(incomeInput.value);
    const loan = parseFloat(amountInput.value);

    if (income > 0 && loan >= 0) {

        const ratio = loan / income;

        percentInput.value = ratio.toFixed(2);
    }
}


incomeInput.addEventListener(
    "input",
    calculateRatio
);

amountInput.addEventListener(
    "input",
    calculateRatio
);

calculateRatio();


// ======================================================
// CHECK BACKEND
// ======================================================

async function checkAPI() {

    try {

        const response = await fetch("/health");

        if (!response.ok) {
            throw new Error();
        }

        apiStatusText.textContent =
            "Service Ready";

        apiDot.style.background =
            "#22c55e";

        apiDot.style.boxShadow =
            "0 0 10px #22c55e";

    }

    catch {

        apiStatusText.textContent =
            "Service Offline";

        apiDot.style.background =
            "#ef4444";

        apiDot.style.boxShadow =
            "0 0 10px #ef4444";

    }

}

checkAPI();


// ======================================================
// LOADING
// ======================================================

function setLoading(loading) {

    submitBtn.disabled = loading;

    const label =
        submitBtn.querySelector(".btn-label");

    const spinner =
        submitBtn.querySelector(".btn-spinner");


    if (label) {

        label.textContent =
            loading
                ? "Analyzing..."
                : "Analyze Credit Risk";
    }


    if (spinner) {

        spinner.style.display =
            loading
                ? "inline-block"
                : "none";
    }
}


// ======================================================
// ERROR
// ======================================================

function showError(message) {

    errorNote.textContent = message;

    errorNote.hidden = false;
}


function clearError() {

    errorNote.hidden = true;

    errorNote.textContent = "";
}


// ======================================================
// NUMBER ANIMATION
// ======================================================

function animateNumber(target) {

    let start = 0;

    const duration = 1000;

    const startTime =
        performance.now();


    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime)
                / duration,
                1
            );


        const value =
            start +
            (target - start) *
            progress;


        probNumber.textContent =
            value.toFixed(1);


        if (progress < 1) {

            requestAnimationFrame(update);
        }

    }


    requestAnimationFrame(update);
}


// ======================================================
// DISPLAY PREDICTION
// ======================================================

function showResult(data) {

    console.log(
        "Prediction result:",
        data
    );


    const probability =
        Number(
            data.default_probability
        );


    const threshold =
        Number(
            data.threshold
        );


    const percentage =
        probability * 100;


    const thresholdPercentage =
        threshold * 100;


    const highRisk =
        data.default_prediction === 1;


    // -----------------------------------
    // Hide empty screen
    // -----------------------------------

    if (emptyState) {

        emptyState.style.display =
            "none";
    }


    // -----------------------------------
    // Show prediction
    // -----------------------------------

    verdict.hidden = false;

    verdict.style.display =
        "block";


    // -----------------------------------
    // Animate probability
    // -----------------------------------

    animateNumber(percentage);


    // -----------------------------------
    // Circular gauge
    // -----------------------------------

    if (gaugeFill) {

        gaugeFill.style.strokeDasharray =
            GAUGE_CIRCUMFERENCE;


        const offset =
            GAUGE_CIRCUMFERENCE *
            (
                1 -
                percentage / 100
            );


        gaugeFill.style.strokeDashoffset =
            offset;
    }


    // -----------------------------------
    // Horizontal risk marker
    // -----------------------------------

    if (riskMarker) {

        riskMarker.style.left =
            `${percentage}%`;
    }


    // -----------------------------------
    // Risk badge
    // -----------------------------------

    stampBadge.classList.remove(
        "low-risk",
        "high-risk"
    );


    if (highRisk) {

        stampBadge.classList.add(
            "high-risk"
        );

        stampText.textContent =
            "HIGH RISK";

        factResult.style.color =
            "#ef4444";

    }

    else {

        stampBadge.classList.add(
            "low-risk"
        );

        stampText.textContent =
            "LOW RISK";

        factResult.style.color =
            "#22c55e";
    }


    // -----------------------------------
    // Details
    // -----------------------------------

    factProb.textContent =
        `${percentage.toFixed(2)}%`;


    factThreshold.textContent =
        `${thresholdPercentage.toFixed(2)}%`;


    factResult.textContent =
        data.Result;


    // -----------------------------------
    // Mobile scroll
    // -----------------------------------

    if (window.innerWidth < 1000) {

        verdict.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ======================================================
// FORM SUBMIT
// ======================================================

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        clearError();

        setLoading(true);


        // ----------------------------------
        // Collect form data
        // ----------------------------------

        const payload = {

            person_age:
                parseFloat(
                    document.getElementById(
                        "person_age"
                    ).value
                ),

            person_income:
                parseFloat(
                    incomeInput.value
                ),

            person_home_ownership:
                document.getElementById(
                    "person_home_ownership"
                ).value,

            person_emp_length:
                parseFloat(
                    document.getElementById(
                        "person_emp_length"
                    ).value
                ),

            loan_intent:
                document.getElementById(
                    "loan_intent"
                ).value,

            loan_grade:
                document.getElementById(
                    "loan_grade"
                ).value,

            loan_amnt:
                parseFloat(
                    amountInput.value
                ),

            loan_int_rate:
                parseFloat(
                    document.getElementById(
                        "loan_int_rate"
                    ).value
                ),

            loan_percent_income:
                parseFloat(
                    percentInput.value
                ),

            cb_person_default_on_file:
                document.getElementById(
                    "cb_person_default_on_file"
                ).value,

            cb_person_cred_hist_length:
                parseFloat(
                    document.getElementById(
                        "cb_person_cred_hist_length"
                    ).value
                )
        };


        console.log(
            "Sending data:",
            payload
        );


        try {

            // ----------------------------------
            // Send to FastAPI
            // ----------------------------------

            const response =
                await fetch(
                    "/predict",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                payload
                            )
                    }
                );


            if (!response.ok) {

                const message =
                    await response.text();

                throw new Error(
                    message
                );
            }


            // ----------------------------------
            // Receive prediction
            // ----------------------------------

            const data =
                await response.json();


            showResult(data);

        }

        catch (error) {

            console.error(error);


            showError(
                "Prediction failed: "
                + error.message
            );

        }

        finally {

            setLoading(false);
        }

    }
);