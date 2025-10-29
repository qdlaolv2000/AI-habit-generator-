// 豆包（Doubao / 火山方舟）API 配置文件
// 请根据你的实际情况修改以下配置

const CONFIG = {
    // 豆包 API 设置（Ark v3 Chat Completions）
    API: {
        // 说明：用户提供的 Base URL 为 https://ark.cn-beijing.volces.com/api/v3
        // Ark Chat Completions 的完整路径为 /chat/completions，这里直接拼接完整可调用地址
        baseURL: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
        apiKey: 'c7e6338f-13d0-4c05-9a5a-8c888a79d2ff', // 豆包 API Key（由用户提供）
        model: 'doubao-1.5-lite-32k',
        maxTokens: 1000,
        temperature: 0.7
    },

    // 系统提示词配置
    PROMPTS: {
        // 行为生成提示词
        behaviors: `你是一个基于福格行为设计模型的专业行为设计师。

**用户的愿望是：{userWish}**

请分析用户愿望，并生成50个与这个愿望直接相关、真正有助于实现这个愿望的微行为。

**关键要求 - 行为与愿望的强关联性：**
1. 每个行为都必须对实现用户的具体愿望有明确的贡献
2. 行为应该是实现愿望路径上的必要步骤或支撑行为
3. 避免生成与愿望无关的通用健康建议
4. 确保行为的逻辑链条：做这个行为 → 如何帮助 → 实现愿望

**福格行为设计原则：**
- **有效性优先**: 行为必须对实现用户愿望有直接、明确的帮助
- **微小化**: 行为足够小，即使动机不足时也能完成
- **具体化**: 明确的行为描述，可立即执行
- **渐进性**: 可以逐步扩展和强化

**行为生成思路：**
1. 先分析愿望的核心要素和实现路径
2. 识别实现愿望需要的关键行为类别
3. 将每个类别细化为具体的微行为
4. 确保每个行为都有明确的"为什么有助于实现愿望"的逻辑

**文化适应性：**
- 符合中国用户的生活习惯和作息时间
- 使用中国用户熟悉的场景和表达方式
- 考虑中国用户的实际生活环境

**输出要求：**
请直接返回50个行为的JSON数组，每个行为都是一个字符串，确保每个行为都与用户愿望高度相关。

示例思路（假设愿望是"提高睡眠质量"）：
- 直接影响睡眠的行为：睡前1小时关闭电子设备
- 创造睡眠环境的行为：睡前调暗房间灯光
- 建立睡眠节律的行为：每天同一时间上床
- 减少睡眠干扰的行为：睡前2小时不饮用咖啡

格式：["行为1", "行为2", ...]`,

        // 锚点生成提示词
        anchors: `请生成50个适合中国用户日常生活的锚点选项，格式统一为"在我...之后"。

**锚点选择原则：**
1. **频率稳定**: 每天都会发生的常规动作
2. **时间固定**: 发生时间相对可预测
3. **易于识别**: 有明确的结束标志
4. **记忆深刻**: 容易被大脑记住和识别

**时间分布要求：**
- 早晨锚点：起床、洗漱、吃早餐等
- 白天锚点：工作、学习、用餐等
- 晚上锚点：下班、洗澡、睡前等

**福格行为设计中的最后动作原则：**
- 锚点应该是某个行为序列的最后一个精确动作
- 例如："上完厕所之后"应该优化为"冲完厕所之后"

请直接返回50个锚点的JSON数组。不要包含任何其他文字说明。

示例格式：
["在我起床下床之后", "在我刷完牙之后", ...]`,

        // 庆祝方式生成提示词
        celebrations: `请生成50个适合中国用户的庆祝方式，用于微习惯养成中的即时奖励。

**庆祝方式设计原则：**
1. **即时性**: 能够立即执行，不需要等待
2. **积极情绪**: 能够产生良好的感受和成就感
3. **简单易行**: 不需要特殊道具或复杂动作
4. **场合适宜**: 适合在各种社交场合使用
5. **文化相符**: 符合中国文化习惯和表达方式

**庆祝类型包括：**
- 身体动作：手势、姿态等
- 内心话语：积极的自我对话
- 想象画面：美好的心理图像
- 简单声音：轻松的音效或词语

**福格行为设计中的庆祝原则：**
- 庆祝应该产生"发光"(shine)的感觉
- 庆祝应该激活大脑的奖励通路
- 庆祝有助于多巴胺分泌，强化行为记忆

请直接返回50个庆祝方式的JSON数组。不要包含任何其他文字说明。

示例格式：
["在心里说'太棒了！'", "微笑并点头", ...]`
    },

    // 行为评估标准
    EVALUATION: {
        // 黄金行为三标准权重
        effectiveWeight: 0.4,    // 有效性权重
        motivationWeight: 0.3,   // 动机权重  
        abilityWeight: 0.3,      // 能力权重

        // 能力评估维度
        abilityDimensions: {
            time: '时间',       // 是否有足够的时间
            money: '资金',      // 是否有足够的资金
            physical: '体力',   // 是否有足够的体力
            mental: '脑力',     // 是否需要很多创意和脑力
            schedule: '日程'    // 是否符合现在的日程
        }
    },

    // UI 配置
    UI: {
        // 每页显示的行为数量
        behaviorsPerPage: 10,
        
        // 最少选择的行为数量
        minWillingBehaviors: 10,
        
        // 进度条动画时间
        progressAnimationTime: 500,
        
        // 加载动画文本
        loadingTexts: [
            'AI正在为你生成个性化行为方案...',
            '基于福格行为设计模型进行分析...',
            '正在匹配最适合你的微习惯...'
        ]
    },

    // 本地存储配置
    STORAGE: {
        // 存储键名
        keys: {
            userWish: 'tinyhabi_user_wish',
            selectedBehaviors: 'tinyhabit_selected_behaviors',
            finalRecipes: 'tinyhabit_final_recipes'
        },
        
        // 是否启用本地存储
        enabled: true
    }
};

// 获取系统提示词
function getSystemPrompt(type) {
    return CONFIG.PROMPTS[type] || CONFIG.PROMPTS.behaviors;
}

// 解析API响应
function parseResponse(content, type) {
    try {
        // 尝试解析JSON
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        
        // 如果不是数组，尝试提取数组
        const arrayMatch = content.match(/\[[\s\S]*\]/);
        if (arrayMatch) {
            return JSON.parse(arrayMatch[0]);
        }
        
        // 如果都失败了，返回空数组
        console.error('无法解析API响应:', content);
        return [];
    } catch (error) {
        console.error('解析API响应失败:', error);
        return [];
    }
}

// 实际的API调用函数（豆包 Ark v3 Chat Completions）
// 说明：保持调用签名不变以兼容现有调用点，但函数名改为 callDoubaoAPI
async function callDoubaoAPI(prompt, type = 'behaviors') {
    try {
        // 构建完整的提示词
        const fullPrompt = getSystemPrompt(type).replace('{userWish}', prompt);
        
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
                        content: '你是一个专业的行为设计师，基于福格行为设计模型为用户提供科学的微习惯养成方案。'
                    },
                    {
                        role: 'user',
                        content: fullPrompt
                    }
                ],
                max_tokens: CONFIG.API.maxTokens,
                temperature: CONFIG.API.temperature
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        return parseResponse(content, type);
    } catch (error) {
        console.error('API调用失败:', error);
        
        // 如果API调用失败，回退到模拟数据
        console.log('回退到模拟数据模式');
        return getBackupData(type, prompt);
    }
}

// 备用数据（当API调用失败时使用）
function getBackupData(type, userWish = '') {
    // 根据用户愿望生成相关的行为建议
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
        behaviors: userWish ? selectRelevantBehaviors(userWish) : behaviorsByCategory.通用,
        
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
    
    return backupData[type] || backupData.behaviors;
}

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
    if (type === 'anchors' && specificBehavior) {
        return getSmartAnchors(specificBehavior);
    } else if (type === 'celebrations' && specificBehavior) {
        return getSmartCelebrations(specificBehavior);
    } else {
        return getBackupData(type, userWish);
    }
}

// 导出配置（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 