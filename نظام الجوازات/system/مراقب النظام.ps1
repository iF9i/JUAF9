Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$notify = New-Object System.Windows.Forms.NotifyIcon
$notify.Visible = $true
$notify.Text = "نظام الجوازات — جاري التحقق..."

# Context menu
$menu = New-Object System.Windows.Forms.ContextMenuStrip
$btnOpen  = $menu.Items.Add("فتح المتصفح")
$btnStop  = $menu.Items.Add("إيقاف السيرفر")
$sep      = $menu.Items.Add("-")
$btnExit  = $menu.Items.Add("إغلاق المراقب")

$btnOpen.add_Click({  [System.Diagnostics.Process]::Start("http://127.0.0.1:5000") })
$btnStop.add_Click({
    try { Invoke-WebRequest -Uri "http://127.0.0.1:5000/api/shutdown" -Method POST -TimeoutSec 3 -UseBasicParsing | Out-Null } catch {}
})
$btnExit.add_Click({ $notify.Visible = $false; [System.Windows.Forms.Application]::Exit() })

$notify.ContextMenuStrip = $menu
$notify.add_DoubleClick({ [System.Diagnostics.Process]::Start("http://127.0.0.1:5000") })

# Monitor loop
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 5000
$wasDown = $false

$timer.add_Tick({
    try {
        Invoke-WebRequest -Uri "http://127.0.0.1:5000" -TimeoutSec 2 -UseBasicParsing | Out-Null
        $notify.Icon = [System.Drawing.SystemIcons]::Shield
        $notify.Text = "نظام الجوازات — شغال ✓"
        if ($wasDown) {
            $notify.BalloonTipTitle = "نظام الجوازات"
            $notify.BalloonTipText  = "السيرفر عاد للعمل"
            $notify.ShowBalloonTip(3000)
            $script:wasDown = $false
        }
    } catch {
        $notify.Icon = [System.Drawing.SystemIcons]::Error
        $notify.Text = "نظام الجوازات — متوقف ✗"
        if (-not $wasDown) {
            $notify.BalloonTipTitle = "نظام الجوازات"
            $notify.BalloonTipText  = "السيرفر توقف!"
            $notify.ShowBalloonTip(5000)
            $script:wasDown = $true
        }
    }
})

$timer.Start()
[System.Windows.Forms.Application]::Run()
$notify.Dispose()
