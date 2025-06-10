import Issue from "../models/issue.model.js";
import Bucket from "../models/bucket.model.js";

export async function CreateIssue(req, res) {
    try {

        const { title, description, priority, tags } = req.body
        const { bucketId } = req.params

        if (!title?.trim() || !description?.trim() || !priority?.trim()) {
            return res
                .status(400)
                .json({
                    error: "All Fields are required",
                    success: false
                })
        }

        const bucket = await Bucket.findById(bucketId)

        if (!bucket) {
            return res
                .status(404)
                .json({
                    message: "Bucket not found",
                    success: false
                })
        }

        const newIssue = await Issue.create({
            title,
            description,
            priority,
            tags: tags || [],
            bucket: bucket.id,
            reporter: req.user.id
        })

        const issue = await Issue.findById(newIssue.id)

        if (issue) {
            return res
                .status(201)
                .json({
                    message: "New Issue created",
                    success: true,
                    data: issue
                })
        }

    } catch (error) {
        console.log("Failed to Create Issue", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function UpdateIssueStatus(req, res) {
    try {

        const { issueId } = req.params
        const { status } = req.body

        if (!status?.trim()) {
            return res
                .status(404)
                .json({
                    error: "Status is required",
                    success: false
                })
        }

        const issue = await Issue.findById(issueId)
            .populate(["reporter", "bucket"])

        if (!issue) {
            return res
                .status(404)
                .json({
                    error: "Issue not found",
                    success: false
                })
        }

        if (issue.reporter.id != req.user.id) {
            return res
                .status(401)
                .json({
                    error: "Unauthorized access - Only Issue Reporter has access of status update",
                    success: false
                })
        }

        issue.status = status
        await issue.save()

        return res
            .status(200)
            .json({
                message: "Issue status updated",
                success: true,
                data: issue
            })

    } catch (error) {
        console.log("Failed to Update Issue Status", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function GetAllUserIssues(req, res) {
    try {

        const issues = await Issue.find({ reporter: req.user.id })
            .populate(["reporter", "bucket"])

        return res
            .status(200)
            .json({
                message: "All User Issues fetched",
                success: true,
                data: issues
            })

    } catch (error) {
        console.log("Failed to Get All Issues", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function GetBucketIssues(req, res) {
    try {

        const { bucketId } = req.params

        const issues = await Issue.find({ bucket: bucketId })
            .populate(["reporter", "bucket"])

        return res
            .status(200)
            .json({
                message: "All Bucket Issues fetched",
                success: true,
                data: issues
            })

    } catch (error) {
        console.log("Failed to Get Bucket Issues", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}
