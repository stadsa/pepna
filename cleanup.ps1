# cleanup.ps1 - merapikan proyek Pepna (hasil export Emergent) untuk dikembangkan di lokal.
#
# Cara pakai:
#   1. Taruh file ini + package.json, craco.config.js, tailwind.config.js, index.html
#      di folder ROOT proyek (sejajar dengan folder "frontend").
#   2. Uji dulu tanpa menghapus apa pun:   powershell -ExecutionPolicy Bypass -File .\cleanup.ps1 -DryRun
#   3. Jalankan sungguhan:                 powershell -ExecutionPolicy Bypass -File .\cleanup.ps1

param([switch]$DryRun)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot

# --- Pengecekan awal ---------------------------------------------------------
if (-not (Test-Path (Join-Path $root "frontend\package.json"))) {
    Write-Host "Folder 'frontend' tidak ditemukan. Taruh script ini di root proyek (sejajar dengan folder frontend)." -ForegroundColor Red
    exit 1
}
foreach ($f in @("package.json", "craco.config.js", "tailwind.config.js", "index.html")) {
    if (-not (Test-Path (Join-Path $root $f))) {
        Write-Host "File pengganti '$f' tidak ada di $root" -ForegroundColor Red
        exit 1
    }
}

if ($DryRun) { Write-Host "=== DRY RUN: tidak ada yang diubah ===" -ForegroundColor Yellow }

# --- 1. Hapus file/folder yang tidak diperlukan -----------------------------------
$toDelete = @(
    # Backend & database (website ini frontend-only)
    "backend", "tests",
    # Artefak Emergent
    ".emergent", "memory", "test_reports", ".ruff_cache",
    "test_result.md", "design_guidelines.json", "README.md", "yarn.lock",
    # Template bawaan yang tidak dipakai
    "frontend\src\components", "frontend\src\hooks", "frontend\src\constants", "frontend\src\lib",
    "frontend\plugins", "frontend\components.json", "frontend\README.md",
    # .env lama berisi URL server Emergent
    "frontend\.env",
    # File di folder public yang ikut ter-deploy
    "frontend\public\pepna-source.zip", "frontend\public\PEPNA_DRAFT.md"
)

foreach ($item in $toDelete) {
    $path = Join-Path $root $item
    if (Test-Path $path) {
        if ($DryRun) {
            Write-Host "[hapus]   $item"
        } else {
            Remove-Item -LiteralPath $path -Recurse -Force
            Write-Host "[dihapus] $item"
        }
    } else {
        Write-Host "[lewati]  $item (tidak ada)" -ForegroundColor DarkGray
    }
}

# --- 2. Pasang file pengganti yang sudah dirapikan ---------------------------------
$copies = @(
    @("package.json",      "frontend\package.json"),
    @("craco.config.js",   "frontend\craco.config.js"),
    @("tailwind.config.js","frontend\tailwind.config.js"),
    @("index.html",        "frontend\public\index.html")
)

foreach ($c in $copies) {
    $src = Join-Path $root $c[0]
    $dst = Join-Path $root $c[1]
    if ($DryRun) {
        Write-Host "[timpa]   $($c[1])  <-  $($c[0])"
    } else {
        Copy-Item -LiteralPath $src -Destination $dst -Force
        Remove-Item -LiteralPath $src -Force
        Write-Host "[diganti] $($c[1])"
    }
}

# --- 3. Pastikan file .env tidak ikut ke git -------------------------------------
$gitignore = Join-Path $root ".gitignore"
if (Test-Path $gitignore) {
    $sudahAda = Select-String -Path $gitignore -Pattern '^\.env$' -Quiet
    if (-not $sudahAda) {
        if ($DryRun) {
            Write-Host "[tambah]  .env ke .gitignore"
        } else {
            Add-Content -Path $gitignore -Value "`n# Environment files`n.env" -Encoding ASCII
            Write-Host "[tambah]  .env ke .gitignore"
        }
    }
}

# --- Selesai -------------------------------------------------------------------
Write-Host ""
if ($DryRun) {
    Write-Host "Dry run selesai. Jalankan lagi tanpa -DryRun untuk menerapkan." -ForegroundColor Yellow
} else {
    Write-Host "Selesai. Langkah berikutnya:" -ForegroundColor Green
    Write-Host "  cd frontend"
    Write-Host "  yarn install"
    Write-Host "  yarn start"
    Write-Host ""
    Write-Host "Script ini boleh dihapus (cleanup.ps1)."
}
