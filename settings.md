# Settings

Note, the following descriptions are mostly gueses.

| Name | Type | Description |
|------|------|------|
|install_revision|0|The current build number.|
|gui.granular_priority|1||
|gui.overhead_in_statusbar|1||
|gui.show_av_icon|1||
|gui.ulrate_menu|2|The amounts to show in the upload rate menu (comma separated string)|
|gui.dlrate_menu|2|The amounts to show in the download rate menu (comma separated string)|
|gui.manual_ratemenu|1|Whether to allow manual input for the upload or download rate manu|
|gui.auto_restart|1||
|minified|1||
|mainwndstatus|0||
|mainwnd_split|0|The width of the side bar|
|mainwnd_split_x|0||
|playback_split_x|0||
|show_general_tab|1||
|show_pulse_tab|1||
|show_tracker_tab|1||
|show_playback_tab|1||
|show_peers_tab|1||
|show_pieces_tab|1||
|show_files_tab|1||
|show_speed_tab|1||
|show_logger_tab|1||
|show_updates_tab|1||
|show_bundles_tab|1||
|show_related_tab|1||
|notify_complete|1||
|gui.color_progress_bars|1|Whether to use colors to the progress bar to indicate the status of a torrent.|
|search_list|2|The list of search engines (format: name|url[enter])|
|search_list_sel|0||
|is_search_filtering|1|Whether the search box will filter the torrents list.|
|offers.left_rail_offer_enabled|1|Whether to show the advertisement in the sidebar on the left.|
|offers.sponsored_torrent_offer_enabled|1|Whether to show the advertisement on top of the torrents list.|
|offers.featured_content_badge_enabled|1||
|offers.featured_content_notifications_enabled|1||
|offers.featured_content_rss_enabled|1||
|offers.featured_content_rss_update_interval|0||
|offers.featured_content_rss_randomize|1||
|offers.404_dismiss|0||
|offers.404_shown|0||
|offers.404_tb_bgc|0||
|offers.404_tb_badge_coords|0||
|offers.404_node|0||
|offers.404_code|0||
|offers.days_to_show|0||
|torrents_start_stopped|1||
|confirm_when_deleting|1|Whether to ask the user to confirm he wants to delete the torrent.|
|confirm_remove_tracker|1|Whether to ask the user to confirm he wants to delete the trackker(s).|
|streaming.safety_factor|0||
|streaming.failover_rate_factor|0||
|streaming.failover_set_percentage|0||
|settings_saved_systime|0|The time the settings were last saved.|
|confirm_exit|1|Whether to ask the user to confirm he wants to exit uTorrent.|
|confirm_exit_critical_seeder|1||
|close_to_tray|1|Whether uTorrent gets put into the system tray when it gets closed.|
|minimize_to_tray|1|Whether uTorrent gets put into the system tray when it gets minimized.|
|start_minimized|1|Whether uTorrent starts minimized.|
|tray.show|1|Whether to always show the tray icon, even when uTorrent is opened.|
|tray.single_click|1|Whether a single click on the tray icon should open uTorrent.|
|activate_on_file|1||
|check_assoc_on_start|1|Whether to check associations on startup.|
|bind_port|0|The port number used for incoming connections.|
|dir_active_download_flag|1|Whether to put new downloads in the directory from `dir_active_download`.|
|dir_torrent_files_flag|1|Whether to put new .torrent files in the directory from `dir_torrent_files`.|
|dir_completed_torrents_flag|1||
|dir_active_download|2|The directory to put active / uncompleted downloads.|
|dir_torrent_files|2|The directory to put active / uncompleted .torrent files.|
|dir_completed_download|2|The directory to put completed downloads.|
|dir_completed_torrents|2|The directory to put completed .torrent files.|
|dir_add_label|1||
|max_dl_rate|0|The global maximum download rate in kB/s (0 = unlimited).|
|max_ul_rate|0|The global maximum upload rate in kB/s (0 = unlimited).|
|max_ul_rate_seed|0|The upload rate when not downloading.|
|max_ul_rate_seed_flag|1|Whether to use `max_ul_rate_seed`.|
|private_ip|1||
|only_proxied_conns|1||
|no_local_dns|1|Whether to disable local DNS lookup.|
|gui.report_problems|1||
|gui.compat_diropen|1||
|gui.alternate_color|1||
|gui.transparent_graph_legend|1||
|sys.prevent_standby|1||
|sys.enable_wine_hacks|1||
|ul_slots_per_torrent|0|The number of upload connection slots per torrent.|
|conns_per_torrent|0|Maximum number of connected peers per torrent.|
|conns_globally|0|The global maximum number of connections.|
|max_active_torrent|0|The maximum number of active torrents (upload or download).|
|max_active_dowload|0|The maximum number of active downloads.|
|seed_prio_limitul|0|The upload rate when the minimum seed ratio (see `seed_ratio`) has been reached.|
|seed_prio_limitul_flag|1|Whether to use `seed_prio_limitul`.|
|seed_prioritized|1|Whether seeding tasks have higher priority than downloading tasks.|
|seed_ratio|0|The minimum ratio (in per mils (aka 1500 = 1.5 ratio)) after which to apply `seed_prio_limitul` if enabled.|
|seed_time|0|The mininum seeding time in minutes.|
|seed_num|0|The minimum number of available seeds.|
|resolve_peerips|1||
|check_update|1|Whether to check for updates.|
|mutable_cfu_interval|0||
|check_update_beta|1|Whether to include beta releases when checking for updates.|
|anoninfo|1||

