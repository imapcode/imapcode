<!-- ═══════════════ HERO ═══════════════ -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0f172a,50:1e3a5f,100:0ea5e9&height=170&section=header&text=ARYAN%20MISHRA&fontSize=44&fontColor=f8fafc&fontAlign=50&fontAlignY=42&desc=%2F%2F%20systems%20%C2%B7%20backend%20%C2%B7%20low-level%20architecture&descSize=16&descColor=bae6fd&descAlignY=68" width="100%" alt="Aryan Mishra banner"/>

<a href="https://imapcode.vercel.app">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=18&duration=2800&pause=900&color=38BDF8&center=true&vCenter=true&width=620&lines=%24+whoami+%E2%86%92+CS+undergrad+%40+Chandigarh+University;%24+focus+%E2%86%92+OS+internals+%C2%B7+game+engines+%C2%B7+I%2FO+pipelines;%24+stack+%E2%86%92+C%2B%2B+%C2%B7+Python+%C2%B7+Java;%24+goal+%E2%86%92+reliable%2C+fast%2C+decoupled+software" alt="typing"/>
</a>

<br/>

[![Portfolio](https://img.shields.io/badge/portfolio-imapcode.vercel.app-0ea5e9?style=flat-square&logo=vercel&logoColor=white)](https://imapcode.vercel.app)
[![LinkedIn](https://img.shields.io/badge/linkedin-imapcode-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/imapcode)
[![Email](https://img.shields.io/badge/email-get%20in%20touch-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:student.aryanmishra@gmail.com)
![Location](https://img.shields.io/badge/based%20in-Delhi%2C%20India-10B981?style=flat-square&logo=googlemaps&logoColor=white)

</div>

<br/>

<!-- ═══════════════ ABOUT ═══════════════ -->
## `01` &nbsp;About

> I like knowing what's underneath the abstraction: from OS registry hooks to hardware-level collision logic.

I'm a third-to-final-year B.E. Computer Science student who builds systems software, game-engine internals and backend pipelines. My default design instincts are **decoupled subsystems**, **memory-efficient data flow** and **deterministic state**.

<table>
<tr>
<td width="50%" valign="top">

**Now**
- 🔧 Building system utilities, low-level OS tools and modular game architectures

**Studying**
- 📚 DSA · Operating Systems · Computer Networks · DBMS

</td>
<td width="50%" valign="top">

**Focus areas**
- ⚙️ Systems programming & OS architecture
- 🎮 Component-based game loops & physics
- 📦 High-throughput I/O & media pipelines
- 🗄️ Backend microservices & relational DBs

</td>
</tr>
</table>

<br/>

<!-- ═══════════════ STACK ═══════════════ -->
## `02` &nbsp;Toolbox

<table>
<tr>
  <td><b>Languages</b></td>
  <td><img src="https://skillicons.dev/icons?i=cpp,c,py,java,js,bash&theme=dark" alt="languages"/></td>
</tr>
<tr>
  <td><b>Web</b></td>
  <td><img src="https://skillicons.dev/icons?i=react,flask,html,css,tailwind&theme=dark" alt="web"/></td>
</tr>
<tr>
  <td><b>Data</b></td>
  <td><img src="https://skillicons.dev/icons?i=postgres,mysql,mongodb&theme=dark" alt="databases"/></td>
</tr>
<tr>
  <td><b>Infra</b></td>
  <td><img src="https://skillicons.dev/icons?i=docker,aws,linux,git,github&theme=dark" alt="infra"/></td>
</tr>
<tr>
  <td><b>Analysis & Design</b></td>
  <td><img src="https://skillicons.dev/icons?i=figma,photoshop&theme=dark" alt="design"/> &nbsp;<img src="https://img.shields.io/badge/Wireshark-1679A7?style=for-the-badge&logo=wireshark&logoColor=white" alt="Wireshark" height="48"/></td>
</tr>
</table>

<br/>

<!-- ═══════════════ PROJECTS ═══════════════ -->
## `03` &nbsp;Selected Projects

<table>
<tr>
<td width="50%" valign="top">

### 🎮 [2D Game Engine](https://github.com/imapcode/2d-game-engine)
`C++` `SFML` `AABB` `FSM`

Component-based engine on a fixed-timestep loop. Input, physics and rendering live in separate subsystems; character behaviour (idle / moving / shooting) runs on a finite state machine, so game logic never touches rendering.

**Highlights:** custom AABB collision · fixed-timestep updates · FSM-driven states

</td>
<td width="50%" valign="top">

### 🖼️ [Image File Manipulation System](https://github.com/imapcode/image-file-manipulation)
`Python` `OpenCV` `Pillow` `Tkinter`

Modular pipeline splitting I/O, processing and rendering. In-memory buffering removes redundant disk reads between chained operations, and the event-driven Tkinter UI stays decoupled from the core.

**Highlights:** batch compression · format conversion · resize · grayscale colorization

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🖥️ [Wallpaper Engine](https://github.com/imapcode/wallpaper-engine)
`Python` `winreg` `ctypes` `Windows API`

Talks to the OS directly through the registry and Win32 calls to set wallpapers. A directory-indexing layer gives O(1) keyboard navigation, with input handling separated from wallpaper state.

**Highlights:** registry interface · O(1) navigation · decoupled input layer

</td>
<td width="50%" valign="top">

### 🎵 [YouTube Downloader & Metadata Embedder](https://github.com/imapcode/yt-downloader-metadata-embedder)
`yt-dlp` `pandas` `eyed3` `mutagen`

Producer-consumer queue that separates download scheduling from tagging. Failures are isolated per item, and an Excel-driven pipeline embeds cover art, lyrics and ID3 tags automatically.

**Highlights:** fault isolation · Excel-driven metadata · auto ID3 tagging

</td>
</tr>
</table>

<details>
<summary><b>🧩 Architecture patterns across these projects</b></summary>

<br/>

```mermaid
flowchart LR
    A[Input layer] --> B[Core logic / state]
    B --> C[Processing subsystem]
    C --> D[Output / rendering]
    B -. isolated failures .-> E[(Queue / buffer)]
    E --> C
```

Every project follows the same idea: keep input, logic and output in separate layers so each can change, fail or scale independently.

</details>

<br/>

<!-- ═══════════════ EDUCATION ═══════════════ -->
## `04` &nbsp;Education

| Period | Institution | Program | Result |
| :-- | :-- | :-- | :-- |
| **2023 – 2027** | Chandigarh University | B.E. Computer Science | CGPA **7.5** |
| **2019 – 2022** | Maxfort School, Dwarka, New Delhi | CBSE · PCM with CS | **84%** (XII) · **80%** (X) |

<sub>Coursework: Data Structures & Algorithms · Operating Systems · DBMS · Computer Networks · OOP · Computer Organization</sub>

<br/>

<!-- ═══════════════ STATS ═══════════════ -->
## `05` &nbsp;Activity

<div align="center">

<a href="https://github.com/imapcode">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=imapcode&theme=tokyonight&hide_border=true&date_format=M%20j%5B%2C%20Y%5D" alt="GitHub streak" width="95%"/>
</a>

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=imapcode&layout=compact&theme=tokyonight&hide_border=true&langs_count=8" alt="Top languages" width="48%"/>
<img src="https://github-readme-stats.vercel.app/api?username=imapcode&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" alt="GitHub stats" width="48%"/>

</div>

<br/>

<!-- ═══════════════ CONTACT ═══════════════ -->
## `06` &nbsp;Let's talk

Open to internships and collaborations in **systems, backend and game-engine work**.
Reach me at [student.aryanmishra@gmail.com](mailto:student.aryanmishra@gmail.com) or through my [portfolio](https://imapcode.vercel.app).

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:0ea5e9,50:1e3a5f,100:0f172a&height=70&section=footer" width="100%" alt="footer"/>
