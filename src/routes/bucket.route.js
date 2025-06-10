import { CreateBucket, DeleteBucket, GetAllBuckets, GetBucketsByMember, GetUserOwnedBuckets, UpdateBucketDetails } from "../controllers/bucket.controller.js";
import { Router } from "express";
import VerifyUser from "../middlewares/auth.middleware.js";

const bucketRouter = Router()

bucketRouter.post("/create", VerifyUser, CreateBucket);
bucketRouter.delete("/delete", VerifyUser, DeleteBucket);
bucketRouter.patch("/update", VerifyUser, UpdateBucketDetails);
bucketRouter.get("/get/all", VerifyUser, GetAllBuckets);
bucketRouter.get("/get/member", VerifyUser, GetBucketsByMember);
bucketRouter.get("/get/owned", VerifyUser, GetUserOwnedBuckets);

export default bucketRouter;