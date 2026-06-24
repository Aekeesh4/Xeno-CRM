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

        "https://xeno-crm-production-1dfc.up.railway.app/api/ai/campaign",

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

      const data = await res.json();

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

              loading

                ? "Generating..."

                : "Generate AI Campaign"

            }

          </button>

          {

            response &&

            <div className="card mt-5">

              <div className="card-body">

                <h3>

                  🤖 AI Recommendation

                </h3>

                <hr />

                <p>

                  <strong>Audience:</strong>

                  {response.audience}

                </p>

                <p>

                  <strong>Channel:</strong>

                  {response.channel}

                </p>

                <p>

                  <strong>Offer:</strong>

                  {response.offer}

                </p>

                <p>

                  <strong>Subject:</strong>

                  {response.subject}

                </p>

                <p>

                  <strong>Best Time:</strong>

                  {response.bestTime}

                </p>

                <p>

                  <strong>Expected Open Rate:</strong>

                  {response.openRate}

                </p>

                <hr />

                <h5>

                  AI Summary

                </h5>

                <p>

                  {response.summary}

                </p>

              </div>

            </div>

          }

        </div>

      </div>

    </div>

  );

}

export default AICopilot;