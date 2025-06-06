modules = ["python-3.11"]

[nix]
channel = "stable-24_05"

[workflows]
runButton = "Project"

[[workflows.workflow]]
name = "Project"
mode = "parallel"
author = "agent"

[[workflows.workflow.tasks]]
task = "workflow.run"
args = "French-Dutch Quiz Game"

[[workflows.workflow.tasks]]
task = "workflow.run"
args = "main"

[[workflows.workflow]]
name = "French-Dutch Quiz Game"
author = "agent"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "python main.py"

[[workflows.workflow]]
name = "main"
author = "agent"

[[workflows.workflow.tasks]]
task = "shell.exec"
args = "python main.py"

[deployment]
run = ["sh", "-c", "python main.py"]
