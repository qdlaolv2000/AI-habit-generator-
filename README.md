# AI微习惯工具箱

基于福格行为设计模型的智能习惯养成工具，结合DeepSeek AI生成个性化的微习惯配方。

## 🌟 功能特点

- **科学依据**: 基于斯坦福大学福格行为设计模型（B=MAP）
- **AI驱动**: 集成DeepSeek生成个性化行为方案
- **移动友好**: 响应式设计，完美适配手机端
- **循序渐进**: 7步科学流程，从愿望到习惯配方
- **可定制**: 支持自定义锚点和庆祝方式

## 🚀 快速开始

### 1. 本地运行

```bash
# 克隆项目
git clone [项目地址]

# 进入项目目录
cd ai-tiny-habit-html

# 直接用浏览器打开
open index.html  # macOS
start index.html  # Windows
```

### 2. 集成DeepSeek API

目前工具使用模拟数据，要集成真实的DeepSeek API，需要修改JavaScript中的`callDeepSeekAPI`函数：

```javascript
// 替换模拟API调用
async function callDeepSeekAPI(prompt, type = 'behaviors') {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${YOUR_API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                {
                    role: 'system',
                    content: getSystemPrompt(type)
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000
        })
    });
    
    const data = await response.json();
    return parseResponse(data.choices[0].message.content, type);
}
```

## 📱 使用流程

### 第1步：输入愿望
- 输入具体、明确的愿望
- 参考提供的有效愿望示例
- 愿望应该是你真正想要的，而不是"应该"的

### 第2步：选择愿意做的行为
- AI生成10个相关行为建议
- 选择至少10个你愿意尝试的行为
- 可以加载更多选项直到找到足够的行为

### 第3步：筛选能做到的行为
- 从"愿意做"的行为中选择"能做到"的
- 基于时间、资金、体力、脑力、日程5个维度评估
- 同时满足"愿意做"和"能做到"的即为"黄金行为"

### 第4步：生成习惯配方
- 为每个黄金行为选择锚点（在...之后）
- 选择合适的庆祝方式（我会...）
- 生成完整的微习惯配方

### 第5步：获得最终方案
- 查看所有黄金行为的完整配方
- 可以截图保存或分享
- 按照配方开始执行

## 🧠 理论基础

### 福格行为模型（B=MAP）
- **B**ehavior = **M**otivation × **A**bility × **P**rompt
- 行为 = 动机 × 能力 × 提示

### 黄金行为三标准
1. **Effective**: 能有效实现你的愿望
2. **Want to do**: 你真正想要做的
3. **Can do**: 你有能力做到的

### 微习惯配方公式
**在我[锚点]之后，我会[微行为]，为了让大脑牢记这个习惯，我会[庆祝]。**

## 🔧 自定义配置

### 修改行为生成提示词

在`generateMockBehaviors`函数中修改行为模板：

```javascript
const behaviorTemplates = [
    "你的自定义行为1",
    "你的自定义行为2",
    // ... 更多行为
];
```

### 修改锚点选项

在`generateMockAnchors`函数中修改锚点列表：

```javascript
return [
    "在我自定义锚点1之后",
    "在我自定义锚点2之后",
    // ... 更多锚点
];
```

### 修改庆祝方式

在`generateMockCelebrations`函数中修改庆祝列表：

```javascript
return [
    "自定义庆祝方式1",
    "自定义庆祝方式2",
    // ... 更多庆祝方式
];
```

## 🎯 DeepSeek提示词模板

### 行为生成提示词

```
你是一个行为设计专家，基于福格行为设计模型。
用户的愿望是：{用户愿望}

请生成20个具体、可执行的微行为，这些行为应该：
1. 直接有助于实现用户的愿望
2. 足够微小，容易执行
3. 具体明确，不抽象
4. 符合中国用户的生活习惯

请以JSON数组格式返回，每个行为都是一个字符串。
```

### 锚点生成提示词

```
请生成20个适合中国用户日常生活的锚点选项，格式为"在我...之后"。
锚点应该：
1. 是每天都会发生的常规动作
2. 发生时间相对固定
3. 容易识别和记忆
4. 涵盖早中晚不同时段

请以JSON数组格式返回。
```

### 庆祝方式生成提示词

```
请生成20个适合中国用户的庆祝方式，用于微习惯养成。
庆祝方式应该：
1. 简单易行，不需要额外道具
2. 能够即时产生积极情绪
3. 适合在各种场合使用
4. 符合中国文化习惯

请以JSON数组格式返回。
```

## 📊 数据结构

### 用户数据结构

```javascript
{
    userWish: "用户愿望",
    selectedWillingBehaviors: ["愿意做的行为1", "愿意做的行为2"],
    selectedAbleBehaviors: ["能做到的行为1", "能做到的行为2"],
    finalRecipes: [
        {
            behavior: "黄金行为",
            anchor: "锚点",
            celebration: "庆祝方式"
        }
    ]
}
```

## 🛠️ 技术栈

- **HTML5**: 页面结构
- **CSS3**: 响应式样式设计
- **JavaScript**: 交互逻辑和状态管理
- **DeepSeek API**: AI内容生成

## 📱 移动端适配

- 响应式设计，自适应不同屏幕尺寸
- 触摸友好的按钮和交互
- 优化的字体大小和间距
- 适配移动端滚动行为

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

如有问题或建议，欢迎通过以下方式联系：
- 创建 Issue
- 发送邮件至 [your-email@example.com]

## 🙏 致谢

- 感谢斯坦福大学福格行为设计实验室的研究成果
- 感谢DeepSeek提供的AI能力支持
- 感谢所有为微习惯研究做出贡献的研究者们 