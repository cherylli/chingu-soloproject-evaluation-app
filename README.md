<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]




<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Chingu Solo Project Evaluation</h3>

  <p align="center">
    An application which helps with chingu.io solo project evaluation
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/cherylli/chingu-soloproject-evaluation-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/cherylli/chingu-soloproject-evaluation-app/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    </a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This application allows user to evaluate solo projects without needing to have direct access to airtable which access is charged per person. It also has features which improves the efficiency of chingu.io solo project evaluation. 

It requires user to be authenticated using github OAuth, then users will be authorized based their roles which is stored in the Chingu airtable.

Feedback is scraped from the [soloproject-evaluation](https://github.com/chingu-voyages/soloproject-evaluation) repository.

## Screenshots
The home screen shows a list of projects to be evaluated, click on the `Discord name` to go to the detail view
![home.png](docs/images/home.png)

Feedback are shown side-by-side in the desktop view
![detail.png](docs/images/detail.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

[![Next][Next.js]][Next-url]
<br/>
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
<br/>
[![shadcn/ui][ShadcnUI]][ShadcnUI-url]
<br/>
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
<br/>
[![Airtable](https://img.shields.io/badge/Airtable-18BFFF?style=for-the-badge&logo=Airtable&logoColor=white)](https://airtable.com/)



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* airtable account (todo: include schema for test database)
* an entry in the chingu admin airtable to be able to login with github account

### Installation

1. Get all required API keys 
2. Clone the repo
   ```sh
   git clone https://github.com/cherylli/chingu-soloproject-evaluation-app
   ```
3. Install NPM packages
   ```sh
   yarn install
   ```
4. Rename `.env.example` to `.env.local` and add API keys
5. Setup test airtable tables if required. Airtable structures can be found [here](/docs/AIRTABLE.md)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Pick a project to evaluate from the home screen. Projects with an empty "Evaluator" field is unclaimed and available for evaluation.


2. Before doing anything, claim the project by clicking on the `Evaluate This` button. This will set the `Evaluator`, and `Evaluation Date` fields in airtable, and the button will be greyed out on success.
   ![evaluate-this.png](docs/images/evaluate-this.png)


3. Enter your feedback in the textarea


4. Select the appropriate 'Evaluation Status', and click `Save`. This will save the feedback into the `Evaluation Feedback` field in airtable, and a save confirmation should be displayed on success. (browser alert at this stage)

![save.png](docs/images/save.png)


5. Copy the congratulations message and send it in #ring-the-bell channel on discord

6. DM member with the feedback

Note: Comments can also be added if necessary. Due to the limitations of the airtable API, all comments will be shown as posted by the person who owns the API key, regardless of the user logged in

![comments.png](docs/images/comments.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

![flowchart.png](docs/images/flowchart.png)

<!-- ROADMAP -->
## Roadmap

- [x] Authentication with github, so we don't have to store user credentials
- [ ] A better confirmation display for actions (save, set evaluator), an alert box is used currently
- [ ] Add Loading state to actions (e.g. save, set evaluator)
- [ ] (Possibly) role based auth for additional admin features 
- [x] Auto scrape feedback repo every x days -> added this but autoscrape every time the feedback repo is updated
- [ ] Save evaluation text in context so progress is not lose on page navigation
- [ ] Comments
  - [x] Show comments
  - [x] Add comments
  - [ ] Edit/Delete comments (not sure if I want to implement this)
- [x] Feedback 
  - [x] copy and paste
  - [x] searchable
- [x] Copy and paste "ring-the-bell" comments
- [ ] Copy and paste feedback based on character count (discord free account limitation)
- [ ] Refactor to add context for functions like setEvaluator, update record, instead of prop drilling
- [ ] Allow posting messages on discord from the app
- [ ] Allow sending emails from the app

See the [open issues](https://github.com/cherylli/chingu-soloproject-evaluation-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

[GNU General Public License V3](https://www.gnu.org/licenses/gpl-3.0)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Cheryl Murphy - [cherylli](https://github.com/cherylli) - https://github.com/cherylli

Project Link: [https://github.com/cherylli/chingu-soloproject-evaluation-app](https://github.com/cherylli/chingu-soloproject-evaluation-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/cherylli/chingu-soloproject-evaluation-app.svg?style=for-the-badge
[contributors-url]: https://github.com/cherylli/chingu-soloproject-evaluation-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/cherylli/chingu-soloproject-evaluation-app.svg?style=for-the-badge
[forks-url]: https://github.com/cherylli/chingu-soloproject-evaluation-app/network/members
[stars-shield]: https://img.shields.io/github/stars/cherylli/chingu-soloproject-evaluation-app.svg?style=for-the-badge
[stars-url]: https://github.com/cherylli/chingu-soloproject-evaluation-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/cherylli/chingu-soloproject-evaluation-app.svg?style=for-the-badge
[issues-url]: https://github.com/cherylli/chingu-soloproject-evaluation-app/issues
[license-shield]: https://img.shields.io/github/license/cherylli/chingu-soloproject-evaluation-app.svg?style=for-the-badge
[license-url]: https://github.com/cherylli/chingu-soloproject-evaluation-app/blob/master/LICENSE.md
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[ShadcnUI]: https://img.shields.io/badge/SHADCN/UI-black
[ShadcnUI-url]: https://ui.shadcn.com/
