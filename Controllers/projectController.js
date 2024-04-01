const { request } = require('express');
const userprojects = require('../Models/projectSchema')
// add project
exports.addproject = async (req, res) => {
    console.log("Inside addprojectController");
    const userId = req.payload
    console.log(userId);
    const projectimg = req.file.filename;
    console.log(projectimg);
    const { title, languages, github, website, overview } = req.body;
    try {
        const existingProject = await userprojects.findOne({ github: github });
        if (existingProject) {
            res.status(406).json("project already exist,upload new one")
        }
        else {
            const newproject = new userprojects({
                title: title,
                languages: languages,
                github: github,
                website: website,
                overview: overview,
                projectimg: projectimg,
                userId: userId
            })
            await newproject.save();
            res.status(200).json("Successfully uploaded the project")
        }
    } catch (err) {
        res.status(401).json("unable to add project due to:", err)
    }
}

exports.getHomeproject = async (req, res) => {
    try {
        const homeProject = await userprojects.find().limit(3);
        res.status(200).json(homeProject)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

exports.getAllprojects = async (req, res) => {
    // getting value from queryparmeter
    // syntax:req.query.keyname
    const searchkey = req.query.search
    console.log(searchkey);
    const query = {
        languages: {
            // regular expresiion
            // i = to remove case sensitivity
            $regex: searchkey, $options: 'i'
        }
    }
    try {
        const allproject = await userprojects.find(query);
        res.status(200).json(allproject)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

exports.getuserprojects = async (req, res) => {
    const userId = req.payload
    try {
        const userproject = await userprojects.find({ userId: userId });
        res.status(200).json(userproject)
    } catch (err) {
        res.staus(401).json("request failed due to", err)
    }
}

exports.editUserProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { title, languages, github, website, overview, projectimg } = req.body;
    const uploadProjectimg = req.file ? req.file.filename : projectimg;
    try {
        const updateProject = await userprojects.findByIdAndUpdate(
            { _id: id },
            {
                title: title,
                languages: languages,
                github: github,
                website: website,
                overview: overview,
                projectimg: uploadProjectimg,
                userId: userId
            },
            { new: true }
        )
        await updateProject.save()
        res.status(200).json("Project updated successfully")
    } catch (err) {
        res.status(401).json("Unable to update due to:", err)
    }
}

exports.deleteUserProject = async (req, res) => {
    const { id } = req.params
    try {
        const removeProject = await userprojects.findByIdAndDelete({ _id: id })
        res.status(200).json("Project deleted successfully")
    } catch (err) {
        res.status(401).json("delete failed", err)
    }
}