import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Customers() {

  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [editingCustomer, setEditingCustomer] = useState(null);

  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const customersPerPage = 5;


  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    company: "",

    status: "ACTIVE",

  });



  const fetchCustomers = async () => {

    try {

      const response = await fetch(
        "http://localhost:8081/api/customer/all"
      );

      const data = await response.json();

      setCustomers(data);

    }

    catch {

      toast.error("Failed To Load Customers");

    }

  };



  useEffect(() => {

    fetchCustomers();

  }, []);



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  const exportCSV = () => {

    const headers = [

      "ID",

      "Name",

      "Email",

      "Phone",

      "Company",

      "Status"

    ];


    const rows = customers.map((customer) => [

      customer.id,

      customer.name,

      customer.email,

      customer.phone,

      customer.company,

      customer.status

    ]);


    const csv =

      [headers, ...rows]

        .map((row) => row.join(","))

        .join("\n");


    const blob = new Blob(

      [csv],

      {

        type: "text/csv;charset=utf-8;",

      }

    );


    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "customers.csv";

    link.click();


    toast.success("CSV Exported Successfully");

  };





  const addCustomer = async () => {

    try {

      setLoading(true);

      await fetch(

        "http://localhost:8081/api/customer/add",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(formData),

        }

      );


      toast.success(

        "Customer Added Successfully"

      );


      setFormData({

        name: "",

        email: "",

        phone: "",

        company: "",

        status: "ACTIVE",

      });


      fetchCustomers();

    }

    catch {

      toast.error("Failed To Add Customer");

    }

    finally {

      setLoading(false);

    }

  };






  const deleteCustomer = async (id) => {

    const confirmDelete =

      window.confirm(

        "Delete This Customer?"

      );


    if (!confirmDelete)

      return;



    try {

      await fetch(

        `http://localhost:8081/api/customer/delete/${id}`,

        {

          method: "DELETE",

        }

      );


      toast.warning(

        "Customer Deleted"

      );


      fetchCustomers();

    }

    catch {

      toast.error(

        "Delete Failed"

      );

    }

  };







  const startEdit = (customer) => {

    setEditingCustomer(customer.id);


    setFormData({

      name: customer.name,

      email: customer.email,

      phone: customer.phone,

      company: customer.company,

      status: customer.status,

    });

  };






  const updateCustomer = async () => {

    try {

      setLoading(true);


      await fetch(

        `http://localhost:8081/api/customer/update/${editingCustomer}`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(formData),

        }

      );


      toast.success(

        "Customer Updated Successfully"

      );


      setEditingCustomer(null);


      setFormData({

        name: "",

        email: "",

        phone: "",

        company: "",

        status: "ACTIVE",

      });


      fetchCustomers();

    }

    catch {

      toast.error(

        "Update Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };



  const activeCustomers =

    customers.filter(

      c => c.status === "ACTIVE"

    ).length;




  const filteredCustomers =

    customers.filter(

      customer =>

        customer.name

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

    );



  const indexOfLastCustomer =

    currentPage * customersPerPage;


  const indexOfFirstCustomer =

    indexOfLastCustomer - customersPerPage;


  const currentCustomers =

    filteredCustomers.slice(

      indexOfFirstCustomer,

      indexOfLastCustomer

    );


  const totalPages =

    Math.ceil(

      filteredCustomers.length

      /

      customersPerPage

    );




  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="fw-bold">

          Customers Management

        </h1>


        <button

          className="btn btn-success"

          onClick={exportCSV}

        >

          Export CSV

        </button>

      </div>





      <div className="row mb-4">

        <div className="col-md-6">

          <div className="card shadow border-0 text-center p-4">

            <h5>Total Customers</h5>

            <h1>{customers.length}</h1>

          </div>

        </div>



        <div className="col-md-6">

          <div className="card shadow border-0 text-center p-4">

            <h5>Active Customers</h5>

            <h1>{activeCustomers}</h1>

          </div>

        </div>

      </div>



      <div className="card shadow border-0 p-4 mb-4">

        <h4 className="mb-4">
          {editingCustomer ? "Edit Customer" : "Add Customer"}
        </h4>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Customer Name"
          className="form-control mb-3"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-3"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="form-control mb-3"
        />

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
          className="form-control mb-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="form-select mb-3"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="CONTACTED">CONTACTED</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {
          editingCustomer ?

          <div>

            <button
              className="btn btn-warning me-2"
              onClick={updateCustomer}
              disabled={loading}
            >
              Update Customer
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {

                setEditingCustomer(null);

                setFormData({

                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  status: "ACTIVE",

                });

              }}
            >
              Cancel
            </button>

          </div>

          :

          <button
            className="btn btn-primary"
            onClick={addCustomer}
            disabled={loading}
          >
            Add Customer
          </button>

        }

      </div>

      <input

        className="form-control mb-4"

        placeholder="Search Customer"

        value={search}

        onChange={(e) =>

          setSearch(e.target.value)

        }

      />




      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Company</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>



          <tbody>

            {

              currentCustomers.map(

                (customer) => (

                  <tr key={customer.id}>

                    <td>{customer.id}</td>

                    <td>{customer.name}</td>

                    <td>{customer.email}</td>

                    <td>{customer.phone}</td>

                    <td>{customer.company}</td>

                    <td>

                      <span

                        className={`badge ${

                          customer.status === "ACTIVE"

                          ?

                          "bg-success"

                          :

                          "bg-warning"

                        }`}

                      >

                        {customer.status}

                      </span>

                    </td>

                    <td>

                      <button

                        className="btn btn-warning btn-sm me-2"

                        onClick={() =>

                          startEdit(customer)

                        }

                      >

                        Edit

                      </button>



                      <button

                        className="btn btn-danger btn-sm"

                        onClick={() =>

                          deleteCustomer(customer.id)

                        }

                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>




      <div className="d-flex justify-content-center mt-4">

        <button

          className="btn btn-outline-primary me-3"

          disabled={currentPage === 1}

          onClick={() =>

            setCurrentPage(

              currentPage - 1

            )

          }

        >

          Previous

        </button>



        <span className="mt-2">

          Page {currentPage}

          {" "}of{" "}

          {totalPages}

        </span>



        <button

          className="btn btn-outline-primary ms-3"

          disabled={

            currentPage === totalPages

            ||

            totalPages === 0

          }

          onClick={() =>

            setCurrentPage(

              currentPage + 1

            )

          }

        >

          Next

        </button>

      </div>

    </div>

  );

}

export default Customers;