const CONFIG = {
    // Doubao API 设置
    API: {
        baseURL: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
        apiKey: 'a9637868-17a7-4ffb-a538-ea08610945c5',
        model: 'doubao-seed-1-6-251015',
        maxTokens: 1000,
        temperature: 0.7
    }
};

// 获取系统提示词
function getSystemPrompt(type) {
    const prompts = {
        behaviors: `你是一个专业的行为设计师，基于福格行为设计模型为用户提供科学的微习惯养成方案。
用户愿望：{userWish}

请根据用户愿望，生成15个具体的、极易执行的微行为（Tiny Habits）。
要求：
1. 行为必须非常微小，可以在30秒内完成
2. 行为必须具体明确
3. 行为要与用户愿望强相关
4. 请直接返回JSON字符串数组，不要包含任何其他说明文字。
格式示例：["喝一杯水", "做2个深蹲", "深呼吸3次"]`,

        anchors: `你是一个行为设计专家。请为微行为"{userWish}"推荐10个合适的锚点（Anchors）。
锚点是生活中固定的、必然发生的事件，用来触发新的微行为。
要求：
1. 格式统一为"在我...之后"
2. 锚点必须是具体、明确的瞬间
3. 涵盖不同的生活场景（早晨、通勤、工作、居家等）
4. 请直接返回JSON字符串数组。
格式示例：["在我刷完牙之后", "在我关上冰箱门之后"]`,

        celebrations: `你是一个行为设计专家。请为微行为"{userWish}"推荐10个合适的庆祝方式（Celebrations）。
庆祝是完成微行为后立即进行的积极情绪反馈。
要求：
1. 简单易行，能立即产生积极情绪
2. 包含肢体动作、语言肯定、想象画面等多种形式
3. 请直接返回JSON字符串数组。
格式示例：["握拳说耶", "对自己微笑", "打个响指"]`
    };
    return prompts[type] || prompts.behaviors;
}

// 调用AI API
async function callAIAPI(prompt, type = 'behaviors') {
    try {
        console.log(`正在调用AI API生成 ${type}...`);
        const systemPrompt = getSystemPrompt(type).replace('{userWish}', prompt);

        const response = await fetch(CONFIG.API.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.API.apiKey}`
            },
            body: JSON.stringify({
                model: CONFIG.API.model,
                messages: [
                    {
                        role: 'system',
                        content: [
                            {
                                type: 'text',
                                text: '你是一个JSON生成器，请只返回纯JSON数组，不要包含markdown标记或其他文字。'
                            }
                        ]
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: systemPrompt
                            }
                        ]
                    }
                ],
                max_tokens: CONFIG.API.maxTokens,
                temperature: CONFIG.API.temperature
            })
        });

        if (!response.ok) {
            throw new Error(`API调用失败: ${response.status}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;

        // 清理可能存在的Markdown标记
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();

        // 解析JSON
        try {
            const result = JSON.parse(content);
            if (Array.isArray(result)) {
                return result;
            } else {
                console.warn('API返回的不是数组格式:', result);
                return getBackupDataSmart(type, prompt);
            }
        } catch (e) {
            console.error('JSON解析失败:', e);
            console.log('原始内容:', content);
            return getBackupDataSmart(type, prompt);
        }

    } catch (error) {
        console.error('AI API调用出错:', error);
        return getBackupDataSmart(type, prompt);
    }
}

let behaviorsByCategory = {
    // 睡眠质量相关
    睡眠: [
        "每天晚上10点后关闭所有电子设备",
        "每天睡前读书5分钟",
        "每天睡前写下3件感恩的事情",
        "每天睡前整理明天的衣服",
        "每天晚上洗脸后涂护肤品",
        "每天同一时间上床睡觉",
        "睡前1小时调暗房间所有灯光",
        "每天睡前做5分钟深呼吸练习",
        "睡前30分钟不查看工作信息",
        "每天晚上为明天准备一杯水放在床头",
        "每天睡前泡脚10分钟",
        "睡前1小时停止工作和学习",
        "每天晚上听5分钟轻音乐",
        "睡前做3分钟拉伸运动",
        "每天晚上关闭卧室所有噪音源",
        "睡前在日记本写下明天的计划",
        "每天睡前喝一小杯温牛奶",
        "睡前调节房间温度到舒适状态",
        "每天晚上整理床铺让它更舒适",
        "睡前做5分钟正念冥想",
        "每天睡前关闭所有社交媒体",
        "睡前设置手机飞行模式",
        "每天晚上用薰衣草精油助眠",
        "睡前做眼部按摩放松眼睛",
        "每天睡前感恩祈祷1分钟"
    ],

    // 身体健康相关
    健康: [
        "每天早上起床后立即喝一杯温水",
        "每天中午吃饭前做2分钟拉伸",
        "每天早上起床后做5个俯卧撑",
        "每次饭后散步10分钟",
        "每天早上起床后开窗通风",
        "每次爬楼梯而不坐电梯",
        "每天吃一个水果",
        "每天做10个深蹲",
        "每次久坐1小时后站起来活动2分钟",
        "每天晚上做5分钟拉伸运动",
        "每天早上做10个开合跳",
        "每次洗手时做踮脚运动",
        "每天午餐时少放一点盐",
        "每次看电视时做平板支撑1分钟",
        "每天多吃一份蔬菜",
        "每次刷牙时做提踵运动",
        "每天早上做5分钟瑜伽",
        "每次等电梯时做墙面俯卧撑",
        "每天喝够8杯水",
        "每次坐下前做3个深蹲",
        "每天做10分钟有氧运动",
        "每次上楼梯时注意正确姿势",
        "每天吃坚果一小把",
        "每次工作间隙做颈部运动",
        "每天做眼保健操2次"
    ],

    // 学习效率相关
    学习: [
        "每次坐下工作前整理一下桌面",
        "每次工作休息时眺望远方30秒",
        "每次开始学习前列一个小目标",
        "每完成一个任务后立即记录进度",
        "每天早上确定当天最重要的3件事",
        "每次使用手机前问自己'这是必要的吗？'",
        "每次学习前准备一杯水",
        "每25分钟休息5分钟",
        "每天晚上回顾当天学到的新知识",
        "每次遇到困难时先深呼吸3次再继续",
        "每次打开书本前先设定学习时间",
        "每完成一个章节后做5分钟总结",
        "每次学习前关闭所有无关网页",
        "每天制作一张知识卡片",
        "每次做笔记时使用不同颜色标记重点",
        "每天早上复习昨天学的内容5分钟",
        "每次学新知识时联想已知概念",
        "每周制定一次学习计划",
        "每次学习前做2分钟冥想",
        "每天睡前快速回忆当天重点内容",
        "每次遇到新词汇时立即查词典",
        "每完成一项任务后立即整理相关资料",
        "每次开始工作前确认优先级",
        "每天记录一个学习心得",
        "每次分心时立即写下分心原因"
    ],

    // 情绪管理相关
    情绪: [
        "每次感到压力时做5次深呼吸",
        "每次洗手后照镜子对自己微笑",
        "每天早上对自己说一句鼓励的话",
        "每次生气时数到10再回应",
        "每天写下一件让自己开心的事",
        "每次感到焦虑时专注当下正在做的事",
        "每天对一个人表达感谢",
        "每次批评自己时改为问'我能从中学到什么？'",
        "每天练习5分钟正念冥想",
        "每次遇到挫折时想想已经取得的进步",
        "每次感到沮丧时听一首喜欢的歌",
        "每天早上拥抱自己3秒钟",
        "每次负面情绪来临时写下感受",
        "每天晚上感谢自己的努力",
        "每次紧张时握紧拳头再放松",
        "每天对镜子里的自己说'你很棒'",
        "每次愤怒时先离开现场5分钟",
        "每天记录一个值得骄傲的小事",
        "每次嫉妒他人时转念想自己的优点",
        "每天做一件让自己开心的小事",
        "每次委屈时给自己一个温暖的拥抱",
        "每天睡前原谅自己一个小错误",
        "每次自我怀疑时回想过往成功经历",
        "每天早上设定一个积极的小目标",
        "每次情绪低落时做10个开合跳"
    ],

    // 通用行为
    通用: [
        "每天早上起床后立即喝一杯温水",
        "每次使用手机前先深呼吸3次",
        "每天晚上睡前写下3件感恩的事情",
        "每次坐下工作前整理一下桌面",
        "每天中午吃饭前做2分钟拉伸",
        "每次洗手后照镜子对自己微笑",
        "每天睡前读书5分钟",
        "每次进门后立即换拖鞋",
        "每天早上出门前检查天气",
        "每次吃完饭后立即刷牙",
        "每天晚上10点后关闭所有电子设备",
        "每次感到压力时做5次深呼吸",
        "每天早上起床后做5个俯卧撑",
        "每次开会前准备一杯茶",
        "每天晚上洗脸后涂护肤品",
        "每次坐电梯时练习正确站姿",
        "每天睡前整理明天的衣服",
        "每次饭后散步10分钟",
        "每天早上起床后开窗通风",
        "每次工作休息时眺望远方30秒",
        "每天早上伸个懒腰",
        "每次接水时感谢水的存在",
        "每天出门前整理一下仪表",
        "每次等待时练习微笑",
        "每天睡前放松全身肌肉",
        "每次走路时注意走路姿势",
        "每天早上问自己今天想成为什么样的人",
        "每次买东西前思考是否真的需要",
        "每天花1分钟欣赏天空",
        "每次听到鸟叫时停下来倾听5秒",
        "每天至少真诚地笑一次",
        "每次洗澡时感谢身体的努力",
        "每天早上穿衣服时感谢有衣服穿",
        "每次看到绿色植物时深呼吸一次",
        "每天睡前检查门窗是否关好",
        "每次收到消息时先暂停3秒再回复",
        "每天早上喝水时感谢这一天的开始",
        "每次上下楼梯时数台阶数",
        "每天花30秒观察周围的美好事物",
        "每次打哈欠时顺便伸个懒腰",
        "每天早上起床时告诉自己'新的一天开始了'",
        "每次关灯时感谢电能带来的光明",
        "每天睡前在心里说'今天也辛苦了'",
        "每次洗手时注意水的温度",
        "每天早上梳头时感谢自己的头发",
        "每次开门时心里默念'新的开始'",
        "每天晚上整理当天用过的物品",
        "每次坐下时调整到最舒适的姿势",
        "每天早上起床时先在床上躺1分钟",
        "每次路过镜子时给自己一个微笑"
    ]
};

// 根据用户愿望选择最相关的行为
function selectRelevantBehaviors(wish) {
    const wishLower = wish.toLowerCase();
    let selectedBehaviors = [];

    // 检查愿望关键词并选择相关行为
    if (wishLower.includes('睡眠') || wishLower.includes('失眠') || wishLower.includes('休息') || wishLower.includes('精力')) {
        selectedBehaviors = [...behaviorsByCategory.睡眠];
    } else if (wishLower.includes('健康') || wishLower.includes('体重') || wishLower.includes('运动') || wishLower.includes('身体')) {
        selectedBehaviors = [...behaviorsByCategory.健康];
    } else if (wishLower.includes('学习') || wishLower.includes('效率') || wishLower.includes('专注') || wishLower.includes('工作')) {
        selectedBehaviors = [...behaviorsByCategory.学习];
    } else if (wishLower.includes('焦虑') || wishLower.includes('压力') || wishLower.includes('情绪') || wishLower.includes('心情')) {
        selectedBehaviors = [...behaviorsByCategory.情绪];
    } else {
        // 混合不同类别的行为
        selectedBehaviors = [
            ...behaviorsByCategory.睡眠.slice(0, 12),
            ...behaviorsByCategory.健康.slice(0, 12),
            ...behaviorsByCategory.学习.slice(0, 13),
            ...behaviorsByCategory.情绪.slice(0, 13)
        ];
    }

    // 如果行为不够50个，用通用行为补充
    if (selectedBehaviors.length < 50) {
        const additionalBehaviors = behaviorsByCategory.通用.filter(
            behavior => !selectedBehaviors.includes(behavior)
        );
        selectedBehaviors = [...selectedBehaviors, ...additionalBehaviors].slice(0, 50);
    }

    return selectedBehaviors;
}

const backupData = {
    behaviors: [], // 动态生成

    anchors: [
        "在我起床下床之后",
        "在我刷完牙之后",
        "在我洗完脸之后",
        "在我穿好衣服之后",
        "在我吃完早餐之后",
        "在我坐到办公桌前之后",
        "在我打开电脑之后",
        "在我吃完午餐之后",
        "在我下班回家之后",
        "在我放下包之后",
        "在我换好拖鞋之后",
        "在我洗完澡之后",
        "在我躺到床上之后",
        "在我关灯之后",
        "在我喝完水之后",
        "在我上完厕所之后",
        "在我锁好门之后",
        "在我坐下来之后",
        "在我站起来之后",
        "在我接完电话之后",
        "在我冲完厕所之后",
        "在我关掉水龙头之后",
        "在我穿好鞋之后",
        "在我收好手机之后",
        "在我关闭电视之后",
        "在我整理好桌面之后",
        "在我拉上窗帘之后",
        "在我锁上手机屏幕之后",
        "在我煮好咖啡之后",
        "在我整理好床铺之后",
        "在我挂断电话之后",
        "在我关闭微信之后",
        "在我系好安全带之后",
        "在我按下电梯按钮之后",
        "在我打开车门之后",
        "在我进入电梯之后",
        "在我关闭电脑之后",
        "在我放下钥匙之后",
        "在我换好衣服之后",
        "在我烧开水之后",
        "在我设置闹钟之后",
        "在我拉开窗帘之后",
        "在我打开冰箱之后",
        "在我关上冰箱之后",
        "在我洗完手之后",
        "在我擦干手之后",
        "在我打开笔记本之后",
        "在我合上笔记本之后",
        "在我收拾好餐具之后",
        "在我插上充电器之后"
    ],

    celebrations: [
        "在心里说'太棒了！'",
        "微笑并点头",
        "握拳做胜利手势",
        "深呼吸一次",
        "给自己点个赞",
        "在心里说'我做到了！'",
        "轻轻拍拍自己的肩膀",
        "闭眼感受成就感3秒",
        "在心里哼一首喜欢的歌",
        "想象朋友为我鼓掌",
        "做一个开心的表情",
        "在心里说'又进步了一点！'",
        "轻轻跳一下",
        "做一个'V'字手势",
        "在心里说'我很棒！'",
        "想象看到烟花绽放",
        "打个响指",
        "在心里说'继续保持！'",
        "做一个得意的笑容",
        "在心里说'我值得为此骄傲！'",
        "伸个懒腰",
        "在心里说'完美！'",
        "眨眨眼对自己示意",
        "做一个小小的庆祝手势",
        "想象自己发光闪闪",
        "在心里播放胜利音乐",
        "轻抚自己的胸口",
        "想象收到一束鲜花",
        "在心里说'步步高升！'",
        "做一个安静的欢呼",
        "想象自己站在领奖台上",
        "在心里给自己颁发奖章",
        "轻轻摆个胜利pose",
        "想象阳光洒在自己身上",
        "在心里说'又成功了一次！'",
        "做一个满意的表情",
        "想象自己被掌声包围",
        "在心里唱一首开心的歌",
        "轻轻做个飞吻给自己",
        "想象自己发出金光",
        "在心里说'真是个好开始！'",
        "做一个轻松的笑",
        "想象自己充满能量",
        "在心里说'我正在变得更好！'",
        "轻轻拍手三下",
        "想象自己闪闪发亮",
        "在心里说'每一步都算数！'",
        "做一个满足的深呼吸",
        "想象自己获得小红花",
        "在心里说'今天又进步了！'"
    ]
};

// 根据行为智能匹配锚点
function getSmartAnchors(behavior) {
    const behaviorLower = behavior.toLowerCase();
    let contextualAnchors = [];

    // 位置匹配
    if (behaviorLower.includes('睡前') || behaviorLower.includes('睡觉')) {
        contextualAnchors = [
            "在我洗完澡之后", "在我刷完牙之后", "在我关灯之后",
            "在我躺到床上之后", "在我设置闹钟之后"
        ];
    } else if (behaviorLower.includes('起床') || behaviorLower.includes('早上')) {
        contextualAnchors = [
            "在我起床下床之后", "在我关掉闹钟之后", "在我穿好衣服之后",
            "在我洗完脸之后", "在我拉开窗帘之后"
        ];
    } else if (behaviorLower.includes('工作') || behaviorLower.includes('学习') || behaviorLower.includes('办公')) {
        contextualAnchors = [
            "在我坐到办公桌前之后", "在我打开电脑之后", "在我整理好桌面之后",
            "在我打开笔记本之后", "在我关闭微信之后"
        ];
    } else if (behaviorLower.includes('吃饭') || behaviorLower.includes('用餐') || behaviorLower.includes('食物')) {
        contextualAnchors = [
            "在我坐下来准备吃饭之后", "在我收拾好餐具之后", "在我洗完手之后",
            "在我关掉水龙头之后", "在我擦干手之后"
        ];
    } else if (behaviorLower.includes('运动') || behaviorLower.includes('锻炼') || behaviorLower.includes('健身')) {
        contextualAnchors = [
            "在我换好运动衣之后", "在我穿好运动鞋之后", "在我到达健身房之后",
            "在我放下包之后", "在我做完热身之后"
        ];
    } else if (behaviorLower.includes('手机') || behaviorLower.includes('电子设备')) {
        contextualAnchors = [
            "在我收好手机之后", "在我锁上手机屏幕之后", "在我关闭电视之后",
            "在我关闭电脑之后", "在我插上充电器之后"
        ];
    }

    // 如果没有特定匹配，使用通用锚点
    if (contextualAnchors.length === 0) {
        contextualAnchors = [
            "在我完成当前任务之后", "在我坐下来之后", "在我站起来之后",
            "在我深呼吸一次之后", "在我看表确认时间之后"
        ];
    }

    // 从所有锚点中随机选择补充
    const allAnchors = [
        "在我起床下床之后", "在我刷完牙之后", "在我洗完脸之后", "在我穿好衣服之后",
        "在我吃完早餐之后", "在我坐到办公桌前之后", "在我打开电脑之后", "在我吃完午餐之后",
        "在我下班回家之后", "在我放下包之后", "在我换好拖鞋之后", "在我洗完澡之后",
        "在我躺到床上之后", "在我关灯之后", "在我喝完水之后", "在我上完厕所之后",
        "在我冲完厕所之后", "在我关掉水龙头之后", "在我穿好鞋之后", "在我收好手机之后"
    ];

    // 合并并去重，然后随机选择
    const combinedAnchors = [...new Set([...contextualAnchors, ...allAnchors])];
    const shuffled = combinedAnchors.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 20);
}

// 根据行为智能匹配庆祝方式
function getSmartCelebrations(behavior) {
    const behaviorLower = behavior.toLowerCase();
    let contextualCelebrations = [];

    // 根据行为类型匹配庆祝方式
    if (behaviorLower.includes('运动') || behaviorLower.includes('锻炼') || behaviorLower.includes('健身')) {
        contextualCelebrations = [
            "握拳做胜利手势", "在心里说'我变得更强了！'", "做一个胜利pose",
            "想象自己充满能量", "轻轻跳一下"
        ];
    } else if (behaviorLower.includes('学习') || behaviorLower.includes('读书') || behaviorLower.includes('工作')) {
        contextualCelebrations = [
            "在心里说'又学到新知识了！'", "给自己点个赞", "在心里说'我正在变得更聪明'",
            "想象自己获得智慧光环", "做一个满意的表情"
        ];
    } else if (behaviorLower.includes('睡前') || behaviorLower.includes('休息') || behaviorLower.includes('放松')) {
        contextualCelebrations = [
            "深呼吸一次", "闭眼感受成就感3秒", "在心里说'今天也做得很好'",
            "想象自己被温暖包围", "做一个满足的深呼吸"
        ];
    } else if (behaviorLower.includes('健康') || behaviorLower.includes('饮食') || behaviorLower.includes('营养')) {
        contextualCelebrations = [
            "在心里说'我在照顾自己的身体'", "想象自己发光闪闪", "轻抚自己的胸口",
            "在心里说'我值得最好的'", "想象自己充满活力"
        ];
    } else if (behaviorLower.includes('整理') || behaviorLower.includes('清洁') || behaviorLower.includes('收拾')) {
        contextualCelebrations = [
            "在心里说'环境变得更好了'", "环顾四周欣赏整洁", "在心里说'我创造了美好'",
            "做一个满意的微笑", "想象空间变得明亮"
        ];
    }

    // 如果没有特定匹配，使用通用庆祝方式
    if (contextualCelebrations.length === 0) {
        contextualCelebrations = [
            "在心里说'太棒了！'", "微笑并点头", "给自己点个赞",
            "在心里说'我做到了！'", "做一个开心的表情"
        ];
    }

    // 从所有庆祝方式中随机选择补充
    const allCelebrations = [
        "在心里说'太棒了！'", "微笑并点头", "握拳做胜利手势", "深呼吸一次", "给自己点个赞",
        "在心里说'我做到了！'", "轻轻拍拍自己的肩膀", "闭眼感受成就感3秒", "在心里哼一首喜欢的歌",
        "想象朋友为我鼓掌", "做一个开心的表情", "在心里说'又进步了一点！'", "轻轻跳一下",
        "做一个'V'字手势", "在心里说'我很棒！'", "想象看到烟花绽放", "打个响指",
        "在心里说'继续保持！'", "做一个得意的笑容", "在心里说'我值得为此骄傲！'"
    ];

    // 合并并去重，然后随机选择
    const combinedCelebrations = [...new Set([...contextualCelebrations, ...allCelebrations])];
    const shuffled = combinedCelebrations.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, 20);
}

// 更新getBackupData函数以支持智能匹配
function getBackupDataSmart(type, userWish = '', specificBehavior = '') {
    if (type === 'behaviors' && userWish) {
        return selectRelevantBehaviors(userWish);
    } else if (type === 'anchors' && specificBehavior) {
        return getSmartAnchors(specificBehavior);
    } else if (type === 'celebrations' && specificBehavior) {
        return getSmartCelebrations(specificBehavior);
    } else {
        return backupData[type] || backupData.behaviors;
    }
}

// 别名，兼容旧代码
const getBackupData = getBackupDataSmart;

// 导出配置（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}