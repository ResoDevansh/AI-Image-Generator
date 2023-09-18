import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components/index";
import "./CreatePost.css";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };
  return (
    <section>
      <div id="heading">Create</div>
      <div id="subheading">
        Create imaginative and visually stunning images through DALL-E AI and
        share them with the community
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          ></FormField>
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An oil pastel drawing of an annoyed cat in a spaceship"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          ></FormField>
          <div>
            {form.photo ? (
              <img src={form.photo} alt={form.photo} className="real-photo" />
            ) : (
              <img src={preview} alt="preview" className="preview-photo" />
            )}
            {generatingImg && (
              <div>
                <Loader className="loader-image" />
              </div>
            )}
          </div>
        </div>
        <div className="generate-btn" style={{ top: !generatingImg && "-1em" }}>
          <button
            type="button"
            onClick={generateImage}
            style={{ cursor: !generatingImg && "pointer" }}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="footer" style={{ top: !generatingImg && "0" }}>
          <p>
            Once you have created the image you want, you can share it with
            others in the community
          </p>
          <button type="submit">
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
