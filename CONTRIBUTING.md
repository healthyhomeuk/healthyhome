# Contributing

If you want to contribute to the project, you shall fork it first and make your changes starting from your own fork.

## Making changes

Whenever new changes are made, make sure that these are grouped together under the same branch on your fork. This will ensure that whenever you are working on different unrelated tasks, the work you want to merge to master won't be affected.

Every commit must:

- contain changes only specific to a single task, which when too big, must split into subtasks. Tasks can be organised and tracked using the GitHub issues tab;
- every commit must hold a meaningful and concise summary of the changes that the commit brings. For example, if you are creating a new function called `calculate_formula`, this should be of the form of: `Add calculate_formula function`. Make sure to use only **ONE** verb. If multiple verbs are needed to describe your commit, this means that your commit must be split into multiple commits! (i.e. it's too big)
- an in-depth description of the commit may also be added if needed to understand the scope of the commit;
- if any commit is related to an issue or multiple issues, you can reference these verbally in your commit description.

## Pushing the changes

When your patch, a collection of interdependent commits, is ready, you may create a pull request to master. Every pull request must be reviewed by another member for approval to merge. If CI testing is employed, a pass is also required for the approval.

### Reverting the changes

If any of your commits in your pending PR have comments that require attention, you must amend your changes to keep a clean history. For example, if your commit `Add calculate_formula function`, meaning that a new function is being added, is lacking a proper documentation, you must amend it instead of creating a new one. This will ensure that your function will come together as a whole into one single commit, instead of being split into multiple commits that are about the same thing resulting in a decline of history consistency.  

## Crash course

The following steps will give you a quick how-to on the workflow.

### Making changes

1. Create a new branch based on master for your new features/bug fixes/code changes
2. Make all the required changes to the branch and commit them as opportune
    - **Bug fixing**: if a bug is a single change, it can easily go in one commit. If a bug involves multiple sections of code that are broken, make a commit for each section that requires fixing;
    - **New features**: if the new features employ several functions, definitions, data sections, commit them as separate bits, each own to its meaning;
    - **Changing code**: as above if the changes touch different parts of codes, e.g. different functions, or have different purposes, e.g. change a formula and change a return status within the same function, separate them in different commits.

**GUIDELINE**: if your commit covers multiple issues, as in it deals with several different things that cannot be summarised in one single sentence, it means that it's too big and must be split. As said above: each commit summary must identify the meaning of the change.

### Pull request

3. Submit a pull request for every topic you are covering. Make sure that the pull request has a meaningful title, summarising the topic, and add a description on what your changes do.
4. Wait for review/approval
5. If any comments are added to your changes, discuss them and if any action must be taken amend your changes! Do not make new commits for every comment, but rather amend the commit that originally received the comment. If you are ready for approval/review again, you can push to the same branch with the PR. This will automatically update the PR with the amended changes.
6. Once everything looks good, your pull request will be approved. Your new changes are now released!
