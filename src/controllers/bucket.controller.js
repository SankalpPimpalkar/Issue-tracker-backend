import Bucket from "../models/bucket.model.js";

export async function CreateBucket(req, res) {
    try {

        const { name, description } = req.body;

        const newBucket = await Bucket.create({
            name,
            description,
            owner: req.user.id,
            members: [req.user.id]
        })

        const bucket = await Bucket.findOne(newBucket.id)
            .populate(["owner", "members"])

        if (bucket) {
            return res
                .status(201)
                .json({
                    message: "New Bucket is created",
                    success: true,
                    data: bucket
                })
        }

    } catch (error) {
        console.log("Failed to Create Bucket", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function DeleteBucket(req, res) {
    try {

        const { bucketId } = req.body;

        const bucket = await Bucket.findByIdAndDelete(bucketId);

        if (bucket) {
            return res
                .status(200)
                .json({
                    message: "Bucket deleted",
                    success: true,
                })
        }

    } catch (error) {
        console.log("Failed to Delete Bucket", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function UpdateBucketDetails(req, res) {
    try {

        const { bucketId, name, description } = req.body;

        const bucket = await Bucket.findById(bucketId)
            .populate(["owner", "members"])

        if (!bucket) {
            return res
                .status(404)
                .json({
                    error: "Bucket not found",
                    success: false
                })
        }

        if (!!name?.trim()) {
            bucket.name = name.trim()
        }

        if (!!description?.trim()) {
            bucket.description = description.trim()
        }

        await bucket.save()

        return res
            .status(200)
            .json({
                message: "Bucket Details updated",
                success: true,
                data: bucket
            })

    } catch (error) {
        console.log("Failed to Update Bucket", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function GetUserOwnedBuckets(req, res) {
    try {

        const buckets = await Bucket.find({ owner: req.user.id })

        return res
            .status(200)
            .json({
                message: "All User Owned buckets fetched",
                success: true,
                data: buckets
            })

    } catch (error) {
        console.log("Failed to Get User Owned Buckets", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function GetBucketsByMember(req, res) {
    try {

        const buckets = await Bucket.find({ members: req.user.id })

        return res
            .status(200)
            .json({
                message: "All Member buckets fetched",
                success: true,
                data: buckets
            })

    } catch (error) {
        console.log("Failed to Get Member Buckets", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}

export async function GetAllBuckets(req, res) {
    try {

        const buckets = await Bucket.find({
            $or: [{ members: req.user.id }, { owner: req.user.id }]
        })

        return res
            .status(200)
            .json({
                message: "All buckets fetched",
                success: true,
                data: buckets
            })

    } catch (error) {
        console.log("Failed to Get All Buckets", error.message)
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: error.message,
                success: false
            })
    }
}