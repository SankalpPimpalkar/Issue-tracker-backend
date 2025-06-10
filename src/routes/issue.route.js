import VerifyUser from "../middlewares/auth.middleware.js";
import { CreateIssue, GetAllUserIssues, UpdateIssueStatus, GetBucketIssues } from "../controllers/issue.controller.js";
import { Router } from "express";

const issueRouter = Router()

issueRouter.post('/:bucketId/create', VerifyUser, CreateIssue)
issueRouter.patch('/:issueId/update', VerifyUser, UpdateIssueStatus)
issueRouter.get('/get/all', VerifyUser, GetAllUserIssues)
issueRouter.get('/get/:bucketId', VerifyUser, GetBucketIssues)

export default issueRouter