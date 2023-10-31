import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/SidebarLearning";

export default function addShop() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const saveItem = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/shop", {
      name: name,
      price: price,
      image: image,
      description: description,
    });
    let path = "/admin/dashboard/shop";
    navigate(path);
    window.alert("User Added Successfully");
  };

  return (
    <div className="flex flex-col">
      <Sidebar />
      <div className="flex flex-col items-center  justify-center min-w-max mt-7">
        <div className="py-5">
          <span className="text-xl font-bold">Add Item</span>
        </div>
        <form onSubmit={saveItem}>
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
                <label className="label  font-bold">Price</label>
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
                  placeholder="Image"
                  value={image}
                  required
                  onChange={(e) => setImage(e.target.value)}
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
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Button */}
              <div className="col-span-2">
                <button className="btn-register [width:300px] py-3 rounded-full font-bold normal-case text-lg text-white hover:text-green-100">
                  Add User
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
}
