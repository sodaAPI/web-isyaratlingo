import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/SidebarLearning";

export default function editShop() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Use null as initial state for image
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const { uuid } = useParams();
  const navigate = useNavigate();

  const baseUrl = "../../../backend";

  const formatTimestamp = (timestamp) => {
    if (!timestamp) {
      return ""; // Return an empty string for undefined or empty timestamps
    }
    try {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Jakarta",
      };
      // Use a console.log to inspect the timestamp before passing it to the Date constructor
      console.log("Input timestamp:", timestamp);

      return new Intl.DateTimeFormat("en-US", options).format(
        new Date(timestamp)
      );
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return ""; // Return an empty string for invalid timestamps
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();

    // Create a FormData object to send form data including the image
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.patch(`http://localhost:5000/shop/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });

      let path = "/admin/dashboard/shop";
      navigate(path);
      window.alert("Item Updated Successfully");
    } catch (error) {
      console.error("Error updating item:", error);
      window.alert("Error updating item.");
    }
  };

  useEffect(() => {
    getItemById();
  }, []);

  const getItemById = async () => {
    const response = await axios.get(`http://localhost:5000/shop/${uuid}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setImage(response.data.image);
    setDescription(response.data.description);
    setCreatedAt(response.data.createdAt);
    setUpdatedAt(response.data.updatedAt);
  };

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col items-center  justify-center min-w-max mt-7">
        <div className="py-5">
          <span className="text-xl font-bold">Edit Item</span>
        </div>
        <form onSubmit={updateItem}>
          <div>
            <section className="grid grid-cols-2 gap-6">
              {/* Name */}

              <div>
                <label className="label font-bold">Name</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="name"
                  placeholder="Name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Price */}

              <div>
                <label className="label font-bold">Price</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Price"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Image */}

              <div>
                <label className="label  font-bold">Image</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="file"
                  accept="image/*" // Accept only image files
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Description */}

              <div>
                <label className="label font-bold">Description</label>
                <input
                  className="py-2 [width:300px] font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Created At */}

              <div>
                <label className="label font-bold">Created At</label>
                <input
                  className="py-2 [width:300px] text-slate-500 font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Created At"
                  value={formatTimestamp(createdAt)}
                  required
                  onChange={(e) => setCreatedAt(e.target.value)}
                  disabled
                />
              </div>

              {/* Updated At */}

              <div>
                <label className="label font-bold">Updated At</label>
                <input
                  className="py-2 [width:300px] text-slate-500 font-semibold px-3 rounded-lg border bg-white border-[#B7B6B8]"
                  type="text"
                  placeholder="Updated At"
                  value={formatTimestamp(updatedAt)}
                  onChange={(e) => setUpdatedAt(e.target.value)}
                  disabled
                />
              </div>

              {/* Button */}
              <div className="col-span-2">
                <button className="btn-register [width:300px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-green-100">
                  Update Vocab
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
