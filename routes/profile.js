import { Router } from "express";
import mongoose from "mongoose";
import multer from "multer";
import * as Appwrite from "node-appwrite";
import { InputFile, Client, Storage, ID } from "node-appwrite";
import { v4 as uuidv4 } from "uuid";


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = Router();
const Profile = mongoose.model("sign");



const appwrite = new Appwrite.Client();
appwrite
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65effcd4e74568158697")
  .setKey(
    "ee63f88156dc89fac62a0743c8596fc2aa1ebcc6f97f10896cfc725b30ebe71a3d9b893cef0602561bb06bd3f39c4cab6f12b2bc376a288f1c26fb4bc237b4e9d7d28df4c4ff3a06b00a94ebf5bf32cac6d1031ff2bb9a565c819bf9b9ba7db987edf5dc998f9e96057f056075342d7e73943ae1eb658c081c9c422c926a395a"
  );

const storageApi = new Appwrite.Storage(appwrite);

app.get("/", async (req, res) => {
  try {
    const { _id } = req.user;
    const profile = await Profile.findById(_id);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/", upload.single("profilePhoto"), async (req, res) => {
  console.log("Request:", req);

  try {
    const { _id } = req.user;
    const { file , body } = req;

    console.log("Request File:", req.file);

    if (!file || !file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const inputfile = InputFile.fromBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const fileId = uuidv4();
    const appwriteFile = await storageApi.createFile(
      "6628d76c1cab610d1b30",
      ID.unique(),
      //fileId,
      inputfile
    );
    console.log(appwriteFile);
    const appwriteFileUrl = `https://cloud.appwrite.io/v1/storage/buckets/6628d76c1cab610d1b30/files/${appwriteFile.$id}/view?project=65effcd4e74568158697&mode=admin`;
    const updatedProfile = await Profile.findByIdAndUpdate(
      _id,
      {
        $set: { profilePhoto: appwriteFileUrl,
          phoneNumber: body.phoneNumber,
      location: body.location
         },
      },
      { new: true }
    );

    res.json(updatedProfile);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(400).json({ message: err.message });
  }
});

// app.put("/", upload.single("profilePhoto"), async (req, res) => {
//   console.log("Request:", req);

//   try {
//     const { _id } = req.user;

//     // Here's the correct way to access the file
//     const file = req.file;

//     console.log("Request File:", file);

//     if (!file || !file.buffer) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     // The rest of your code remains the same
//     // ...
//   } catch (err) {
//     console.error("Error updating profile:", err);
//     res.status(400).json({ message: err.message });
//   }
// });


app.delete("/:id", async (req, res) => {
  try {
    const { _id } = req.user;
    await Profile.findByIdAndDelete(_id);
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default app;
