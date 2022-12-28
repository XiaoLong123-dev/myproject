[TOC]



# HTML、CSS

## 基础知识

### 初始化样式

有些标签默认含有内外边距，且不同浏览器大小也不一样。为了统一我们可以重置标签的 CSS 默认样式。

最简单的方式就是使用插件[css-reset (opens new window)](https://meyerweb.com/eric/tools/css/reset/)完成，你也可以在 vscode 等编辑器中定义代码片段。

```css
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" />
```

### 选择器

#### 基本选择器

| 选择器            | 示例       | 描述                                   |
| :---------------- | ---------- | :------------------------------------- |
| .class            | .intro     | 选择 class="intro" 的所有元素          |
| #id               | #firstname | 选择 id="firstname" 的所有元素         |
| *                 | *          | 选择所有元素                           |
| element           | p          | 选择所有 p 元素                        |
| element,element   | div,p      | 选择所有 div 元素和所有 p 元素         |
| element element   | div p      | 选择 div 元素内部的所有 p 元素         |
| element>element   | div>p      | 选择父元素为 div 元素的所有 p 元素     |
| element+element   | div+p      | 选择紧接在 div 元素之后的所有 p 元素   |
| element1~element2 | p~ul       | 选择p元素同级并在p元素后面的所有ul元素 |

##### 子元素选择器

只选中子元素不选中孙级及以下元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        main article>h2 {
            color: green;
        }
    </style>
</head>

<body>
    <main>
        <article>
            <h2 name="houdunren">houdunren.com</h2> <!--变绿-->
            <aside>
                <h2>houdunwang.com</h2>
            </aside>
        </article>
        <h2 name="hdcms.com">hdcms.com</h2>
        <h1>后盾人</h1>
    </main>
</body>

</html>
```

##### 紧邻兄弟元素

用于选择**紧挨**着的同级兄弟元素

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* hdcms.com变绿 */
        main article+h2 {
            color: green;
        }
    </style>
</head>
<body>
    <main>
        <article>
            <h2 name="houdunren">houdunren.com</h2>
            <aside>
                <h2>houdunwang.com</h2>
            </aside>
        </article>
        <h2 name="hdcms.com">hdcms.com</h2><!-- 变绿 -->
        <h1>后盾人</h1>
        <h2 name="hdcms2.com">hdcms2.com</h2>
    </main>
</body>

</html>
```

##### 后面的兄弟元素

article~* : 用于选择后面所有的兄弟元素；article~h2 ：用于选择后面指定的兄弟元素

```html

    <style>
        main article~* {
            color: green;
        }
        /* hdcms.com，hdcms2.com都变绿,h1不变绿
         main article~h2 {
            color: green;
        } */
    </style>
<body>
    <main>
        <article>
            <!--  -->
            <h2 name="houdunren">houdunren.com</h2>
            <aside>
                <h2>houdunwang.com</h2>
            </aside>
        </article>
        <h2 name="hdcms.com">hdcms.com</h2><!-- 变绿 -->
        <h1>后盾人</h1><!-- 变绿 -->
        <h2 name="hdcms2.com">hdcms2.com</h2><!-- 变绿 -->
    </main>
</body>
```

#### 属性选择器

根据属性来为元素设置样式

| 选择器              | 示例               | 描述                                                        |
| :------------------ | ------------------ | :---------------------------------------------------------- |
| [attribute]         | [target]           | 带有 target 属性所有元素                                    |
| [attribute=value]   | [target=_blank]    | targe 属性 等于"_blank" 的所有元素                          |
| [attribute~=value]  | [title~=houdunren] | title 属性包含单词 "houdunren" 的所有元素                   |
| [attribute\|=value] | [title\|=hd]       | `title 属性值为 "hd"的单词，或hd-cms` 以`-`连接的的独立单词 |
| [attribute*=value]  | a[src*="hdcms"]    | src 属性中包含 "hdcms" 字符的每个 a 元素                    |
| [attribute^=value]  | a[src^="https"]    | src 属性值以 "https" 开头的每个 a 元素                      |
| [attribute$=value]  | a[src$=".jpeg"]    | src 属性以 ".jpeg" 结尾的所有 a 元素                        |

为具有 `class` 属性的 h1 标签设置样式

```text
h1[class] {
    color: red;
}
...

<h1 class="container">houdunren.com</h1>
```

约束多个属性

```text
h1[class][id] {
    color: red;
}
...

<h1 class="container" id >houdunren.com</h1>
```

具体属性值设置样式

```text
a[href="https://www.houdunren.com"] {
    color: green;
}
...

<a href="https://www.houdunren.com">后盾人</a>
<a href="">HDCMS</a>
```

`^` 以指定值开头的元素

```text
h2[name^="hdcms"] {
    color: red;
}
...

<h2 name="houdunren">houdunren.com</h2>
<h2 name="hdcms.com">hdcms.com</h2>
```

`$` 以指定值结尾的元素

```text
<h2 name="houdunren">houdunren.com</h2>
<h2 name="hdcms.com">hdcms.com</h2>
...

h2[name$="com"] {
    color: red;
}
```

`*` 属性内部任何位置出现值的元素

```text
h2[name*="houdunren"] {
    color: red;
}
...

<h2 name="houdunren">houdunren.com</h2>
<h2 name="houdunren.com">hdcms.com</h2>
```

`~` 属性值中包含指定**词汇**的元素(必须是一个单词，不是包含关系)

```text
/* 可以不写冒号 */
h2[name~="houdunren"] {
    color: red;
}
...

<h2 name="houdunren">houdunren.com</h2><!-- 变色 -->
<h2 name="houdunren web">hdcms.com</h2><!-- 变色 -->
<h2 name="houdunrenweb">hdcms.com</h2><!-- 不变色 -->
```

`|` 以指定值开头或以属性连接破折号的元素

```text
h2[name|="houdunren"] {
    color: red;
}
...

<h2 name="houdunren">houdunren.com</h2><!-- 变色 -->
<h2 name="houdunren-web">hdcms.com</h2><!-- 变色 -->
<h2 name="houdunrenweb">hdcms.com</h2><!-- 不变色 -->
```

#### 伪类选择器

| 状态                 | 示例                  | 说明                                          |
| -------------------- | --------------------- | --------------------------------------------- |
| :link                | a:link                | 选择所有未被访问的链接                        |
| :visited             | a:visited             | 选择所有已被访问的链接                        |
| :hover               | a:hover               | 鼠标移动到元素上时                            |
| :active              | a:active              | 点击正在发生时                                |
| :focus               | input::focus          | 选择获得焦点的 input 元素                     |
| :root                | :root                 | 选择文档的根元素即 html。                     |
| :empty               | p:empty               | 选择没有子元素的每个 p 元素（包括文本节点）。 |
| :first-child         | p:first-child         | 选择属于父元素的第一个子元素的每个 p 元素     |
| :last-child          | p:last-child          | 选择属于其父元素最后一个子元素每个 p 元素。   |
| :first-of-type       | p:first-of-type       | 选择属于其父元素的首个 p 元素的每个 p 元素    |
| :last-of-type        | p:last-of-type        | 选择属于其父元素的最后 p 元素的每个 p 元素。  |
| :only-of-type        | p:only-of-type        | 选择属于其父元素唯一的 p 元素的每个 p 元素。  |
| :only-child          | p:only-child          | 选择属于其父元素的唯一子元素的每个 p 元素。   |
| :nth-child(n)        | p:nth-child(2)        | 选择属于其父元素的第二个子元素的每个 p 元素。 |
| :nth-child(odd)      | p:nth-child(odd)      | 选择属于其父元素的奇数 p 元素。               |
| :nth-child(even)     | p:nth-child(even)     | 选择属于其父元素的偶数 p 元素。               |
| :nth-of-type(n)      | p:nth-of-type(2)      | 选择属于其父元素第二个 p 元素的每个 p 元素。  |
| :nth-last-child(n)   | p:nth-last-child(2)   | 同上，从最后一个子元素开始计数。              |
| :nth-last-of-type(n) | p:nth-last-of-type(2) | 同上，但是从最后一个子元素开始计数。          |
| :not(selector)       | :not(p)               | 选择非 p 元素的每个元素                       |

##### :target

用于控制具有锚点目标元素的样式

```text
div {
	height: 900px;
}

div:target {
	color: red;
}
...

<a href="#hdcms">hdcms</a>
<div></div>
<div id="hdcms">
	hdcms内容管理系统
</div>
```

##### :empty

没有内容和空白的元素。下面第一个 p 标签会产生样式，第二个不会因为有空白内容

```text
:empty {
    border: solid 2px red;
}
...
<p></p>
<p> </p>
```

##### :first-of-type

选择父元素下第一个类型为span的元素

```text
article span:first-of-type {
    color: red;
}
...

   <article>
        <span>houdunren.com</span><!-- 变色 -->
        <span>houdunren2.com</span>
        <aside>
            <strong>hdcms.com</strong>
            <span>houdunwang.com</span><!-- 变色 -->
            <span>houdunwang2.com</span>
        </aside>
    </article>
```

##### :last-of-type

```html
article span:last-of-type {
            color: red;
}

<article>
        <span>houdunren.com</span>
        <span>houdunren2.com</span><!-- 变色 -->
        <aside>
            <strong>hdcms.com</strong>
            <span>houdunwang.com</span>
            <span>houdunwang2.com</span><!-- 变色 -->
        </aside>
</article>
```

##### :only-of-style

 ``article span:only-of-type``如果article中只有一个span元素，才会生效

```html
 <style>
        article span:only-of-type {
            color: red;
        }
    </style>

<body>
     <article>
        <span>houdunren.com</span><!-- 不变色 -->
        <!-- 只有一个span的时候才会生效 -->
        <span>houdunren2.com</span><!-- 不变色 -->
        <aside>
            <strong>hdcms.com</strong>
            <span>houdunwang.com</span><!-- 变色 -->
            <!-- 如果再加一个span两个都不会生效 -->
            <!-- <span>houdunwang2.com</span> -->
        </aside>
    </article>
</body>
```

##### :only:child

只有当父元素下只有一个子元素时才能生效

```html
    <style>
        article span:only-child {
            color: red;
        }
    </style>
 <article>
     <!-- 当只有span这一个子元素时才能生效 -->
        <span>houdunren.com</span>
     <!-- 加上p就不能生效 -->
        <p>1</p>
</article>
```

##### :nth-child()

选择第二个元素并且是 span 标签的

```html
<style>
         article span:nth-child(3) {
            color: red;
        } 
    </style>
    <article>
        <span>houdunren.com</span><!-- nth-child(1) -->
        <aside>
            <span>houdunwang.com</span><!-- nth-child(1) -->
            <span>hdcms.com</span><!-- nth-child(2) -->
        </aside>
        <span>hdphp.com</span><!-- nth-child(3) -->
    </article>
```

##### :nth-of-type()

选择指定的第几个元素，不管中间的其他元素

```html
<style>
        article span:nth-of-type(2) {
            color: red;
        }
</style>
    <article>
        <span>houdunren.com</span><!-- nth-of-type(1) -->
        <aside>
            <span>houdunwang.com</span><!-- nth-of-type(1) -->
            <span>hdcms.com</span><!-- nth-of-type(2) -->
        </aside>
        <span>hdphp.com</span><!-- nth-of-type(2) -->
    </article>
```

##### :not(selector)

排除第一个li元素

```html
ul li:not(:nth-child(1)) {
    background: red;
}
...

<ul>
  <li>houdunren.com</li>
  <li>hdcms.com</li>
  <li>后盾人</li>
</ul>
```

#### 表单伪类

| 选择器    | 示例           | 说明                        |
| --------- | -------------- | --------------------------- |
| :enabled  | input:enabled  | 选择每个启用的 input 元素   |
| :disabled | input:disabled | 选择每个禁用的 input 元素   |
| :checked  | input:checked  | 选择每个被选中的 input 元素 |
| :required | input:required | 包含`required`属性的元素    |
| :optional | input:optional | 不包含`required`属性的元素  |
| :valid    | input:valid    | 验证通过的表单元素          |
| :invalid  | input:invalid  | 验证不通过的表单            |

#### 字符伪类

| 状态           | 示例           | 说明                            |
| -------------- | -------------- | ------------------------------- |
| ::first-letter | p:first-letter | 选择每个 p 元素的首字母         |
| ::first-line   | p:first-line   | 选择每个 p 元素的首行           |
| ::before       | p:before       | 在每个 p 元素的内容之前插入内容 |
| ::after        | p:after        | 在每个 p 元素的内容之后插入内容 |

##### 添加属性内容

> CSS 表达式 `attr()` 用来获取选择到的元素的某一 HTML 属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素。

```html
h2::before {
	content: attr(title);
}
...

<h2 title="后盾人">houdunren.com</h2>
```

### 元素权重

#### 权重的应用

| 规则            | 粒度 |
| --------------- | ---- |
| ID              | 0100 |
| class，类属性值 | 0010 |
| 标签,伪元素     | 0001 |
| *               | 0000 |
| 行内样式        | 1000 |

#### 继承规则

子元素可以继承父元素设置的样式，但是高度、边框等并不会继承，继承的规则没有权重



### 文本样式

#### 单词内断行

#### 大小写转换

小写转大写(将小写字母转换为小型大写字母；)

```html
span {
font-variant: small-caps;
}
 <span>houdunren.com</span>
```

首字母大写(只要不是连着的单词都会把首字母大写，除了_连接的)

```html
text-transform: capitalize;
```

全部大写

```html
text-transform: uppercase;
```

全部小写

```css
text-transform: lowercase;
```

#### 阴影控制

参数顺序为：颜色，水平偏移，垂直偏移，模糊度。

```html
<style>
  h2 {
  	text-shadow: rgba(13, 6, 89, 0.8) 3px 3px 5px;
  }
</style>
```

#### 空白处理

使用 `white-space` 控制文本空白显示。

| 选项     | 说明                                              |
| -------- | ------------------------------------------------- |
| pre      | 保留文本中的所有空白，类似使用 pre 标签，不会换行 |
| nowrap   | 禁止文本换行                                      |
| pre-wrap | 保留空白，保留换行符，会换行                      |
| pre-line | 空白合并，保留换行符，会换行                      |

#### 文本溢出

##### 单行文本

溢出后换行

```css
h2 {
  overflow-wrap: break-word;
  width: 100px;
	border: solid 1px #ddd;
}
```

溢出后末尾添加``...``

```css
<style>
h2{
    width:200px;
    border:1px solid blueviolet;
    overfloat:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
</style>
```

##### 多行文本

多行文本溢出时添加``...``

```css
<style>
div{
    width:200px;
    border:1px solid #ddd;
    overflow:hidden; // 超出文本隐藏
    display:-webkit-box; // 将对象作为弹性伸缩盒子模型显示
    -webkit-box-orient:vertical; // 从上到下垂直排列子元素(设置伸缩盒子的子元素排列方式)
    -webkit-line-clamp:2; // 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数
}
</style>
```

##### 表格文本溢出

表格文本溢出控制需要为tale标签定义``table-layout:fixed;``样式，表示列宽是由表格和单元格宽度定义

```css
<style>
table{
    table-layout:fixed;
}
table tbody tr td {
    white-space:nowrap;
    overflow:hiddden;
    text-overflow:ellipsis;
}
</style>
```

#### 垂直对齐

使用``vertical-align``用于定义内容的垂直对其风格，包括``middle | baseline | sub | super``等，也可以使用数值`` vertical-align: 10px;``

#### 排版模式

| 模式          | 说明                                     |
| ------------- | ---------------------------------------- |
| horizontal-tb | 水平方向自上而下的书写方式               |
| vertical-rl   | 垂直方向自右而左的书写方式               |
| vertical-lr   | 垂直方向内内容从上到下，水平方向从左到右 |

### 盒子模型

#### 外边距

##### 边距合并

这种现象发生在两个并列的元素之间。给一个元素设置下外边距（margin-bottom），并同时给一个元素设置上外边距（margin-top）。两个元素之间的距离不等于这两个外边距之和，而是等于其中最大的一个外边距。

```css
<style>
	h2 {
    border: solid 2px green;
    margin-bottom: 20px;
  }

  h3 {
    border: solid 2px green;
    height: 20px;
  }
</style>
...
    <!-- h2与h3的外边距会合并，两者的间隔是20px  -->
<h2>hdcms.com</h2>
<h3></h3>
```

解决方法：

* **解决方案一：只设置其中一个元素的margin值即可（推荐）**
* **解决方案二：给每一个元素添加父元素，然后触发BFC规则（不推荐）**

##### 外边距塌陷

两个嵌套关系的（父子关系）块元素，当父元素有上外边距或者没有上外边距（margin-top），子元素也有上外边距的时候。两个上外边距会合成一个上外边距，以值相对较大的上外边距值为准。

解决方法：

* **1、给父元素设置外边框（border）或者内边距（padding）(不建议)**
* **触发BFC（推荐）**

> BFC：Block Formatting Context，块级格式化上下文，BFC决定了元素对其内容定位，以及当前元素与其他元素之间的关系和相互作用。其目的就是形成一个独立的空间，让空间中的子元素不会影响到这个独立空间之外的布局。

* 主要解决方案如下：
  * 子元素或者父元素的**float**不为**none**
  * 子元素或者父元素的**position**不为**relative**或**static**
  * 父元素的**overflow**为**auto**或**scroll**或**hidden**
  * 父元素的**display**的值为**table-cell**或**inline-block**

#### 边框设计

##### 样式设计

| 类型   | 描述                                                  |
| :----- | :---------------------------------------------------- |
| none   | 定义无边框。                                          |
| dotted | 定义点状边框。在大多数浏览器中呈现为实线。            |
| dashed | 定义虚线。在大多数浏览器中呈现为实线。                |
| solid  | 定义实线。                                            |
| double | 定义双线。双线的宽度等于 border-width 的值。          |
| groove | 定义 3D 凹槽边框。其效果取决于 border-color 的值。    |
| ridge  | 定义 3D 垄状边框。其效果取决于 border-color 的值。    |
| inset  | 定义 3D inset 边框。其效果取决于 border-color 的值。  |
| outset | 定义 3D outset 边框。其效果取决于 border-color 的值。 |

#### 轮廓线

元素在获取焦点时产生，并且轮廓线不占用空间。可以使用伪类 `:focus` 定义样式。

- 轮廓线显示在边框外面
- 轮廓线不影响页面布局

组合定义

```css
outline: red solid 2px;
```

取消表单轮廓线

```css
input:focus {
	outline: none;
}
```

#### display 与 visibility

**display:none;**

使用该属性后，HTML元素（对象）的宽度、高度等各种属性值都将“丢失”;该元素的位置被其他元素顶替

**visibility:hidden;**

使用该属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在，也即是说它仍具有高度、宽度等属性值。

#### 尺寸定义

| 选项           | 说明                         |
| -------------- | ---------------------------- |
| width          | 宽度                         |
| height         | 高度                         |
| min-width      | 最小宽度                     |
| min-height     | 最小高度                     |
| max-width      | 最大宽度                     |
| max-height     | 最大高度                     |
| fill-available | 撑满可用的空间               |
| fit-content    | 根据内容适应尺寸             |
| min-content    | 将容器尺寸按最小元素宽度设置 |
| max-content    | 容器尺寸按子元素最大宽度设置 |