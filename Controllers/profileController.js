const { request } = require('express');
const profile = require('../Models/profileSchema')

exports.addprofile = async (req, res) => {
    console.log("Inside addprofile");
    const userId = req.payload
    const profileimg = req.file.filename;
    const { github, linkedin } = req.body;
    try {
        const existingProfile = await profile.findOne({ github: github });
        if (existingProfile) {
            res.status(406).json("profile already exist,upload new one")
        }
        else {
            const newprofile = new profile({
                profileimg: profileimg,
                github: github,
                linkedin: linkedin,
                userId: userId
            })
            await newprofile.save();
            res.status(200).json("Successfully uploaded the project")
        }
    } catch (err) {
        res.status(401).json("unable to add project due to:", err)
    }
}

exports.getuserprofile = async (req, res) => {
    const userId = req.payload
    try {
        const userprofile = await profile.find({ userId: userId });
        res.status(200).json(userprofile)
    } catch (err) {
        res.staus(401).json(`request failed due to:${err}`)
    }
}

exports.updateuserprofile = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { github, linkedin, profileimg } = req.body;
    const uploadProfileimg = req.file ? req.file.filename : profileimg;
    try {
        const updateprofile = await profile.findByIdAndUpdate(
            { _id: id },
            {
                profileimg: uploadProfileimg,
                github: github,
                linkedin: linkedin,
                userId: userId
            },
            { new: true } 
        )
        await updateprofile.save()
        res.status(200).json("Profile updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
}

exports.deleteUserProfile = async (req, res) => {
    const { id } = req.params
    try {
        const removeProfile = await profile.findByIdAndDelete({ _id: id })
        res.status(200).json("Profile deleted successfully")
    } catch (err) {
        res.status(401).json("delete failed", err)
    }
}