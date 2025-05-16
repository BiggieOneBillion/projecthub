import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  GitProjectCommitController,
  ICommit,
} from "../services/git-project-commit.service";
import { Task } from "@/model/db-model-in-use";

export async function POST(req: NextRequest) {
  // console.log"Webhook received");
  // console.log"Headers:", req.headers);
  // Step 1: Validate the request signature
  // const signature = "hbhbijnkj"
  // // const signature = req.headers["x-hub-signature-256"];
  // // console.log"Signature:", signature);

  // if (!signature) {
  //   return NextResponse.json({ message: "Missing signature" }, { status: 401 });
  // }

  // const body = JSON.stringify(req.body); // Raw body
  // const hmac = crypto.createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET!);
  // const digest = `sha256=${hmac.update(body).digest("hex")}`;

  // // console.log"Digest:", digest);

  // if (signature !== digest) {
  //   return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  // }

  // Step 2: Process the event
  const event = req.headers.get("x-github-event");
  const payload = await req.json();

  // console.log"Event:", event);
  // console.log"Payload:", payload);

  try {
    switch (event) {
      case "push":
        // console.log`Push event to repo: ${payload.repository.full_name}`);
        // Add your custom logic for handling push events here

        // save the commit to the database
        const commitData: ICommit = {
          author: payload.head_commit.author.username,
          committer: payload.head_commit.committer.username,
          date: payload.head_commit.timestamp,
          message: payload.head_commit.message,
          project_name: payload.repository.full_name,
          sha: payload.head_commit.id,
          branch: payload.ref.split("/").splice(2).join("/"),
        };

        // console.log"Commit Data:", commitData);

        await GitProjectCommitController.createGitCommit(commitData);
        // send a notification to the user
        break;

      // case "pull_request":  //! WILL SETUP LATER
      //   // console.log
      //     `Pull request event in repo: ${payload.repository.full_name}`
      //   );
      //   // console.log`Action: ${payload.action}`);
      //    // check if the commit message contains a task number
      //   // if it does, update the task status from in progress to completed
      //   break;

      case "create":
        // console.log`Create event to repo: ${payload.repository.full_name}`);
        // check if the ref_type is branch
        if (payload.ref_type === "branch") {
          // // console.log'BRANCHED', payload.ref);
          // check if branch created is equal to any task required and if it is, then update the task status from pending to in progress
          const checkIfRepositoryExit = await Task.findOne({
            taskId: payload.ref,
          }).exec();

          // // console.log"Task found:", checkIfRepositoryExit);

          if (checkIfRepositoryExit) {
            // update the task status from pending to in progress
            await Task.findByIdAndUpdate(checkIfRepositoryExit._id, {
              status: "in-progress",
            });
          }
        }
        // send a notification to the user.
        break;

      default:
      // console.log`Unhandled event: ${event}`);
    }

    return NextResponse.json({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
