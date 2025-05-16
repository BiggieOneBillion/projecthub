// import { githubService } from "../services/github.service";

// Task Controller
// const TaskController = {
//     // Create a new task
//     async createTask(req, res) {
//       try {
//         const { title, description, repositoryId } = req.body;
        
//         // Generate task ID
//         const lastTask = await Task.findOne().sort({ taskId: -1 });
//         const taskNumber = lastTask 
//           ? parseInt(lastTask.taskId.split('-')[1]) + 1 
//           : 1;
//         const taskId = `TASK-${taskNumber}`;
  
//         const task = await Task.create({
//           taskId,
//           title,
//           description,
//           repositoryId
//         });
  
//         res.json({ success: true, task });
//       } catch (error) {
//         res.status(400).json({ 
//           success: false, 
//           error: error.message 
//         });
//       }
//     },
  
//     // Get all tasks for a repository
//     async getRepositoryTasks(req, res) {
//       try {
//         const { repositoryId } = req.params;
//         const tasks = await Task.find({ repositoryId })
//           .sort({ createdAt: -1 });
  
//         res.json({ success: true, tasks });
//       } catch (error) {
//         res.status(400).json({ 
//           success: false, 
//           error: error.message 
//         });
//       }
//     }
//   };
  
  // Repository Controller
  // const RepositoryController = {
  //   // Add a repository to monitor
  //   async addRepository(req, res) {
  //     try {
  //       const { owner, name } = req.body;
  
  //       // Get repository details from GitHub
  //       const { data: repo } = await githubService.octokit.repos.get({
  //         owner,
  //         repo: name
  //       });

      
  
  //       // Set up webhook
  //       const webhook = await githubService.setupWebhook(owner, name);
  
  //       const repository = await Repository.create({
  //         githubId: repo.id.toString(),
  //         name,
  //         owner,
  //         webhookId: webhook.id
  //       });
  
  //       res.json({ success: true, repository });
  //     } catch (error) {
  //       res.status(400).json({ 
  //         success: false, 
  //         error: error.message 
  //       });
  //     }
  //   },
  
  //   // Get dashboard data
  //   async getDashboardData(req, res) {
  //     try {
  //       const repositories = await Repository.find()
  //         .populate({
  //           path: 'tasks',
  //           select: 'taskId title status branchCreated branchName'
  //         });
  
  //       const dashboardData = await Promise.all(
  //         repositories.map(async (repo) => {
  //           const branches = await githubService.getRepositoryBranches(
  //             repo.owner, 
  //             repo.name
  //           );
  
  //           return {
  //             ...repo.toObject(),
  //             branchCount: branches.length,
  //             branches: branches.map(b => b.name)
  //           };
  //         })
  //       );
  
  //       res.json({ success: true, data: dashboardData });
  //     } catch (error) {
  //       res.status(400).json({ 
  //         success: false, 
  //         error: error.message 
  //       });
  //     }
  //   }
  // };