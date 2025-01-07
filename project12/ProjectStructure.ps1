param (
    [switch]$Help, # Show help message
    [string]$RootPath = $PSScriptRoot, # Default root is the location of the script
    [string[]]$Exclude = @("node_modules", "vendor", ".git", ".bin", ".bolt"), # Default exclusions
    [switch]$UseRunLocation # Flag to use the current runtime directory as root
)

# Display help message
if ($Help -or $h) {
    Write-Host @"
This script generates a tree structure of the folder hierarchy starting from a specified root directory.
By default, it uses the location of the script as the root. Optionally, you can specify to use the current working directory.

Parameters:
    -RootPath <string>          Specifies the root directory for the folder tree. Defaults to the script's location.
    -Exclude <string[]>         Specifies an array of folder names to exclude. Defaults: node_modules, vendor, .git, .bin, .bolt
    -UseRunLocation             Uses the current working directory instead of the script's location as the root.
    -Help or -h                 Displays this help message.

Example Usage:
    .\ProjectStructure.ps1                         # Default: root = script location
    .\ProjectStructure.ps1 -UseRunLocation         # Root = current directory
    .\ProjectStructure.ps1 -Exclude @(".git")      # Root = script location, Excludes .git only
"@
    exit
}

if ($UseRunLocation) {
    $RootPath = (Get-Location).Path
}

function Get-FolderTree {
    param (
        [string]$Path,
        [string[]]$Exclude,
        [string]$Indent = ""
    )
    
    Get-ChildItem -Path $Path -Force | ForEach-Object {
        if ($_.PSIsContainer) {
            if ($Exclude -contains $_.Name) {
                Write-Output "$Indent|-- $_.Name (excluded)"
            } else {
                Write-Output "$Indent|-- $_.Name"
                Get-FolderTree -Path $_.FullName -Exclude $Exclude -Indent "$Indent    "
            }
        } else {
            Write-Output "$Indent|-- $_.Name"
        }
    }
}

(Get-FolderTree -Path $RootPath -Exclude $Exclude) -replace '\.Name$', '' | Out-File -FilePath "ProjectStructure.txt"

Write-Host "Folder tree generated at ProjectStructure.txt"
