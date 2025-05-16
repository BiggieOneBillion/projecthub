import { Octokit } from '@octokit/rest';
import { createNodeMiddleware } from '@octokit/webhooks';

class GitHubService {
  constructor(githubToken) {
    this.octokit = new Octokit({ auth: githubToken });
    this.webhooks = new Webhooks({
      secret: process.env.GITHUB_WEBHOOK_SECRET
    });
  }

  // Set up webhook for a repository
  async setupWebhook(owner, repo) {
    try {
      const webhook = await this.octokit.repos.createWebhook({
        owner,
        repo,
        config: {
          url: `${process.env.API_URL}/api/github/webhook`,
          content_type: 'json',
          secret: process.env.GITHUB_WEBHOOK_SECRET
        },
        events: ['create'] // Listen for branch creation events
      });

      return webhook.data;
    } catch (error) {
      throw new Error(`Failed to set up webhook: ${error.message}`);
    }
  }

  // Listen for webhook events
  setupWebhookListeners() {
    this.webhooks.on('create', async ({ payload }) => {
      if (payload.ref_type === 'branch') {
        await this.handleBranchCreation(payload);
      }
    });

    return createNodeMiddleware(this.webhooks);
  }

  // Handle branch creation events
  async handleBranchCreation(payload) {
    const branchName = payload.ref;
    const repositoryId = payload.repository.id.toString();

    // Extract task ID from branch name (assuming format: TASK-123-description)
    const taskIdMatch = branchName.match(/^(TASK-\d+)/);
    if (taskIdMatch) {
      const taskId = taskIdMatch[1];
      await this.updateTaskBranchStatus(taskId, branchName, repositoryId);
    }
  }

  // Update task when branch is created
  async updateTaskBranchStatus(taskId, branchName, repositoryId) {
    try {
      await Task.findOneAndUpdate(
        { taskId, repositoryId },
        { 
          branchCreated: true, 
          branchName,
          status: 'IN_PROGRESS',
          updatedAt: new Date()
        }
      );
    } catch (error) {
      console.error(`Failed to update task status: ${error.message}`);
    }
  }

  // Get repository branches
  async getRepositoryBranches(owner, repo) {
    try {
      const { data: branches } = await this.octokit.repos.listBranches({
        owner,
        repo
      });
      return branches;
    } catch (error) {
      throw new Error(`Failed to fetch branches: ${error.message}`);
    }
  }
}

export const githubService = new GitHubService(process.env.GITHUB_TOKEN);