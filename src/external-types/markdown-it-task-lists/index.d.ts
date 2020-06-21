
declare module 'markdown-it-task-lists' {
  import MarkdownIt from 'markdown-it/lib'
  import { TaskListsOptions } from './interface'
  const markdownItTaskLists: MarkdownIt.PluginWithOptions<TaskListsOptions>
  export = markdownItTaskLists
}
