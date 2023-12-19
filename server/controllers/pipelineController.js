const Profile = require('../models/profileModel')
const mongoose = require('mongoose')

// GET a single profile
const getPipeline = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Profile.'})
    }

    const profile = await Profile.findById(id)

    if (!profile) {
        return res.status(404).json({error: 'No such Profile.'})
    }

    res.status(200).json(profile.pipeline)
}

// REMOVE an experience from a pipeline
const removeExperience = async (req, res) => {
    const { id } = req.params
    const { index } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Profile.'})
    }

    const profile = await Profile.findOne({ _id: id })

    if (!profile) {
        return res.status(404).json({error: 'No such Profile.'})
    }

    // create new pipeline
    const newPipeline = profile.pipeline

    // remove the experience at index
    newPipeline.splice(index, 0)

    // update pipeline in db
    profile.updateOne({
        pipeline: newPipeline
    })

    res.status(200).json(profile)
}

// ADD an experience
const addExperience = async (req, res) => {
    const { id } = req.params
    const { index, company, title, date } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Profile.'})
    }

    const profile = await Profile.findOne({ _id: id })

    if (!profile) {
        return res.status(404).json({error: 'No such Profile.'})
    }

    // create new pipeline + experience
    const newPipeline = profile.pipeline
    const experience = {
        company: company,
        title: title,
        date: date
    }

    // if no index, push to end of pipeline; else insert at index
    if (!index) {
        newPipeline.push(experience)
    } else {
        newPipeline.splice(index, 0, experience)
    }

    // update pipeline in db
    profile.updateOne({
        pipeline: newPipeline
    })

    res.status(200).json(profile)
}

module.exports = {
    getPipeline,
    removeExperience,
    addExperience,
}