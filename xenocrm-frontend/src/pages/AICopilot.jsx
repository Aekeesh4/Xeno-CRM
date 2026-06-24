import { useState } from "react";

function AICopilot() {

  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const [response, setResponse] = useState(null);

  const generateCampaign = async () => {

    if (prompt.trim() === "") {

      alert("Please enter your campaign request.");

      return;

    }

    setLoading(true);

    try {

      const res = await fetch(

        "https://xeno-crm-production-1dfc.up.railway.app/api/ai/gemini",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            prompt: prompt,

          }),

        }

      );
  if (!res.ok) {

    throw new Error("Gemini API Error");

  }

      const data = await res.text();


      setResponse(data);

    }

    catch (err) {

      console.log(err);

      alert("Unable to connect AI Service");

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow-lg border-0">

        <div className="card-body p-5">

          <h2 className="fw-bold">

            🤖 AI Campaign Copilot

          </h2>

          <p className="text-muted">

            Describe your marketing goal in natural language.

          </p>

          <textarea

            className="form-control"

            rows="8"

            placeholder="Example:
Bring back inactive customers.
Offer 20% discount.
Generate campaign."

            value={prompt}

            onChange={(e) => setPrompt(e.target.value)}

          />

          <button

            className="btn btn-primary mt-4"

            onClick={generateCampaign}

            disabled={loading}

          >

           {
             loading ? (
               <>
                 <span
                   className="spinner-border spinner-border-sm me-2"
                   role="status"
                   aria-hidden="true"
                 ></span>

                 Generating AI...
               </>
             ) : (
               "Generate AI Campaign"
             )
           }

          </button>

          {

            response &&

            <div className="card mt-5">

              <div className="card-body">

                <h3>

                🤖 AI Campaign Recommendation

                </h3>

                <hr />

               <hr />

              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "16px",
                  lineHeight: "1.7",
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid #dee2e6",
                  overflowX: "auto"
                }}
              >
                {response}
              </pre>
              </div>

            </div>

          }

        </div>

      </div>

    </div>

  );

}

export default AICopilot;