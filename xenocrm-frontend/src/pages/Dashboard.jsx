import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalLeads, setTotalLeads] = useState(0);
  const [newLeads, setNewLeads] = useState(0);
  const [contactedLeads, setContactedLeads] = useState(0);
  const [convertedLeads, setConvertedLeads] = useState(0);

  const [activities, setActivities] = useState([]);

  const [insights, setInsights] = useState({

    hotLeads: 0,

    bestSource: "",

    conversionRate: 0,

    recommendation: ""

  });



  useEffect(() => {

    fetch("http://localhost:8081/api/dashboard/total-customers")
      .then(res => res.json())
      .then(data => setTotalCustomers(data));



    fetch("http://localhost:8081/api/dashboard/total-leads")
      .then(res => res.json())
      .then(data => setTotalLeads(data));



    fetch("http://localhost:8081/api/dashboard/new-leads")
      .then(res => res.json())
      .then(data => setNewLeads(data));



    fetch("http://localhost:8081/api/dashboard/contacted-leads")
      .then(res => res.json())
      .then(data => setContactedLeads(data));



    fetch("http://localhost:8081/api/dashboard/converted-leads")
      .then(res => res.json())
      .then(data => setConvertedLeads(data));



    fetch("http://localhost:8081/api/activity/recent")
      .then(res => res.json())
      .then(data => setActivities(data));



    fetch("http://localhost:8081/api/ai/insights")
      .then(res => res.json())
      .then(data => setInsights(data))
      .catch(err => console.log(err));



  }, []);



  const pieData = [

    {

      name: "NEW",

      value: newLeads,

    },

    {

      name: "CONTACTED",

      value: contactedLeads,

    },

    {

      name: "CONVERTED",

      value: convertedLeads,

    },

  ];



  const COLORS = [

    "#0d6efd",

    "#ffc107",

    "#198754",

  ];



  const barData = [

    {

      name: "Customers",

      count: totalCustomers,

    },

    {

      name: "Leads",

      count: totalLeads,

    },

  ];



  const conversionRate =

    totalLeads === 0

      ? 0

      : ((convertedLeads / totalLeads) * 100).toFixed(1);




  return (

    <div className="container mt-4">

      <div className="text-center mb-5">

        <h1 className="fw-bold">

          Welcome, {user?.name}

        </h1>



        <h5 className="text-secondary">

          Role : {user?.role}

        </h5>



        <small className="text-muted">

          {new Date().toDateString()}

        </small>

      </div>





      <div className="row g-4 mb-5">

        <div className="col-md-4">

          <div className="card shadow border-0 text-center p-4">

            <h5>Total Customers</h5>

            <h1 className="text-primary">

              {totalCustomers}

            </h1>

          </div>

        </div>




        <div className="col-md-4">

          <div className="card shadow border-0 text-center p-4">

            <h5>Total Leads</h5>

            <h1 className="text-info">

              {totalLeads}

            </h1>

          </div>

        </div>





        <div className="col-md-4">

          <div className="card shadow border-0 text-center p-4">

            <h5>Conversion Rate</h5>

            <h1 className="text-success">

              {conversionRate}%

            </h1>

          </div>

        </div>





        <div className="col-md-4">

          <div className="card shadow border-0 text-center p-4">

            <h5>New Leads</h5>

            <h1 className="text-primary">

              {newLeads}

            </h1>

          </div>

        </div>





        <div className="col-md-4">

          <div className="card shadow border-0 text-center p-4">

            <h5>Contacted Leads</h5>

            <h1 className="text-warning">

              {contactedLeads}

            </h1>

          </div>

        </div>





        <div className="col-md-4">

          <div className="card shadow border-0 text-center p-4">

            <h5>Converted Leads</h5>

            <h1 className="text-success">

              {convertedLeads}

            </h1>

          </div>

        </div>

      </div>







      <div className="row mb-5">

        <div className="col-md-3">

          <div className="card shadow border-0 text-center p-4">

            <h5>🔥 Hot Leads</h5>

            <h1 className="text-danger">

              {insights.hotLeads}

            </h1>

          </div>

        </div>




        <div className="col-md-3">

          <div className="card shadow border-0 text-center p-4">

            <h5>📈 Best Source</h5>

            <h3 className="text-primary">

              {insights.bestSource}

            </h3>

          </div>

        </div>





        <div className="col-md-3">

          <div className="card shadow border-0 text-center p-4">

            <h5>⚡ AI Conversion</h5>

            <h2 className="text-success">

              {

                Number(

                  insights.conversionRate

                ).toFixed(1)

              }%

            </h2>

          </div>

        </div>





        <div className="col-md-3">

          <div className="card shadow border-0 p-4">

            <h5>💡 Recommendation</h5>

            <small>

              {insights.recommendation}

            </small>

          </div>

        </div>

      </div>







      <div className="row">

        <div className="col-md-6">

          <div className="card shadow border-0 p-4">

            <h4 className="mb-4">

              Lead Status Distribution

            </h4>



            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie

                  data={pieData}

                  dataKey="value"

                  outerRadius={100}

                  label

                >

                  {

                    pieData.map(

                      (entry, index) => (

                        <Cell

                          key={index}

                          fill={COLORS[index]}

                        />

                      )

                    )

                  }

                </Pie>



                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>






        <div className="col-md-6">

          <div className="card shadow border-0 p-4">

            <h4 className="mb-4">

              CRM Overview

            </h4>



            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={barData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />



                <Bar

                  dataKey="count"

                  fill="#0d6efd"

                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>








      <div className="row mt-5">

        <div className="col-md-12">

          <div className="card shadow border-0 p-4">

            <h3 className="mb-4">

              Recent Activities

            </h3>



            {

              activities.length === 0

                ?

                <p className="text-muted">

                  No Recent Activities

                </p>

                :

                activities.map(

                  (activity) => (

                    <div

                      key={activity.id}

                      className="border-bottom pb-3 mb-3"

                    >

                      <div className="fw-semibold">

                        ✅ {activity.message}

                      </div>



                      <small className="text-muted">

                        {

                          new Date(

                            activity.createdAt

                          ).toLocaleString()

                        }

                      </small>

                    </div>

                  )

                )

            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;