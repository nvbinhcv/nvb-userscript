const renderLogs = (filter = 'all') => {
                    if (!logList) return;
                    logList.innerHTML = '';
                    const entries = (window.hh3dLogBuffer || []).filter(e => filter === 'all' || e.type === filter);
                    // Oldest first → newest at bottom
                    for (let i = 0; i < entries.length; i++) {
                        _hh3dRenderLogLine(logList, entries[i], false);
                    }
                    logList.scrollTop = logList.scrollHeight;
                };

                renderLogs('all');

                if (logFilter) logFilter.addEventListener('change', () => renderLogs(logFilter.value));
                if (logClear) logClear.addEventListener('click', () => {
                    window.hh3dLogBuffer = [];
                    renderLogs('all');
                });
                break;
            }

            default:
                break;
        }
    }

    // ===============================================
    // XUẤT CÀI ĐẶT
    // ===============================================
    function exportSettings() {
        const exactKeys = [
            'selfSchedule_h',
            'selfSchedule_m',
            'generalVipMode',
            'hoangvucMaximizeDamage',
            'khoangmach_use_buff',
            'khoangmach_fast_attack',
            'khoangmach_auto_takeover',
            'khoangmach_auto_takeover_rotation',
            'khoangmach_outer_notification',
            'khoangmach_reward_mode',
            'khoangmach_reward_time',
            'khoangmach_check_interval',
            'luyenDanMinStars',
            'luyenDanTargetTier',
            'luyenDanAutoStart',
            'luyenDanAutoUse',
            'luyenDanAutoDecompose',
            'luyenDanAutoTune',
            'luyenDanAutoInvite',
            'luyenDanWaitInviteSeconds',
            'luyenDanAutoAcceptInvite',
            'luyenDanAcceptAllInvites',
            'luyenDanAutoLeave',
            'luyenDanHireDanHuan',
            'luyenDanSelectedFriendIds',
            'reservebicanhAttacks',
            'bicanhSocketEnabled',
            'luanVoChallengeMode',
            'dice-roll-choice',
            'tienduyen-choice',
            'muaLinhDuoc_buyBundle',
            'muaLinhDuoc_buyKim',
            'muaLinhDuoc_buyMoc',
            'muaLinhDuoc_buyThuy',
            'muaLinhDuoc_buyHoa',
            'muaLinhDuoc_buyTho'
        ];

        const prefixKeys = [
            'khoangmach_selected_mine_',
            'khoangmach_leave_mine_to_claim_reward_',
            'luanVoTargetUserId_',
            'luyenDanLastProgress_',
            'reserve',
            'SocketEnabled',
            '-choice'
        ];

        const exported = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;

            const isExact = exactKeys.includes(key);
            const isPrefix = prefixKeys.some(prefix => key.startsWith(prefix) || key.endsWith(prefix));

            if (isExact || isPrefix) {
                exported[key] = localStorage.getItem(key);
            }
        }

        const jsonStr = JSON.stringify(exported, null, 2);

        Swal.fire({
            title: '📤 Xuất Cấu Hình',
            html: `
                <p style="font-size:13px;