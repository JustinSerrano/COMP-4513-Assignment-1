# COMP 4513 (Winter 2025)

### Assignment #1: Node, SQL (via Supabase)

## 🎨 Overview

This API provides information about paintings, artists, genres, and eras. Built with **Node.js, Express, and Supabase**, it allows users to retrieve, filter, and sort painting data.

![Express](https://img.shields.io/npm/v/express?color=000000&label=Express.js&logo=express&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18.20.7-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-2.49.0-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![ChatGPT](https://img.shields.io/badge/Powered_by-ChatGPT-412991?style=for-the-badge&logo=openai&logoColor=white)

## 🚀 Features

- Retrieve paintings by **genre, era, artist, gallery**
- Fetch **sorted paintings** (title, year)
- Get **genres & artists with painting counts**
- Deployed on **Render** [View API](https://comp-4513-assignment-1-qgjq.onrender.com/)

---

## 📂 **Project Structure**

```
w2025-assign1/
│── data/ # Database and CSV files
│── node_modueles/ #Node.js libraries (auto-installed)
│── routes/ # API route directory
│ ├── paintings.js # Paintings API routes
│ ├── artists.js # Artists API routes
│ ├── genres.js # Genres API routes
│ ├── galleries.js # Galleries API routes
│ ├── eras.js # Eras API routes
│ ├── counts.js # Count-related API routes (e.g.,top genres)
│── .env # Environment variables (Supabase keys)
│── .gitignore # Files to ignore in Git
│── art-server.js # Main server file
│── package.json # Node.js dependencies & scripts
│── package-lock.json # Locks exact dependency versions
│── README.md # Project documentation
```

## 🖥️ **API Endpoints**

### 🎨 **Paintings**

| Method | Endpoint                                 | Description                               |
| ------ | ---------------------------------------- | ----------------------------------------- |
| `GET`  | `/api/paintings`                         | Get all paintings                         |
| `GET`  | `/api/paintings/:id`                     | Get a specific painting by ID             |
| `GET`  | `/api/paintings/sort/:sortBy`            | Get paintings sorted by `title` or `year` |
| `GET`  | `/api/paintings/genre/:id`               | Get paintings by genre ID                 |
| `GET`  | `/api/paintings/era/:id`                 | Get paintings by era ID                   |
| `GET`  | `/api/paintings/artist/country/:country` | Get paintings by artist nationality       |

### 🎭 **Artists**

| Method | Endpoint           | Description                          |
| ------ | ------------------ | ------------------------------------ |
| `GET`  | `/api/artists`     | Get all artists with painting counts |
| `GET`  | `/api/artists/:id` | Get a specific artist by ID          |

### 🏛️ **Galleries**

| Method | Endpoint                          | Description                  |
| ------ | --------------------------------- | ---------------------------- |
| `GET`  | `/api/galleries`                  | Get all galleries            |
| `GET`  | `/api/galleries/:id`              | Get a specific gallery by ID |
| `GET`  | `/api/galleries/country/:country` | Get galleries by country     |

### 🎭 **Genres**

| Method | Endpoint                          | Description                                             |
| ------ | --------------------------------- | ------------------------------------------------------- |
| `GET`  | `/api/counts/genres`              | Get genres with painting counts (sorted fewest to most) |
| `GET`  | `/api/counts/topgenres/:minCount` | Get genres with more than `minCount` paintings          |
| `GET`  | `/api/genres/painting/:id`        | Get genres used in a given painting                     |

### 🕰️ **Eras**

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| `GET`  | `/api/eras`     | Get all eras             |
| `GET`  | `/api/eras/:id` | Get a specific era by ID |

## 🔗 **Testing Links**

Click any link below to test the API.

### 📌 **Part 1**

- [🔗 `/api/eras`](https://comp-4513-assignment-1-qgjq.onrender.com/api/eras)
- [🔗 `/api/galleries`](https://comp-4513-assignment-1-qgjq.onrender.com/api/galleries)
- [🔗 `/api/galleries/30`](https://comp-4513-assignment-1-qgjq.onrender.com/api/galleries/30)
- [🔗 `/api/galleries/Calgary`](https://comp-4513-assignment-1-qgjq.onrender.com/api/galleries/Calgary)
- [🔗 `/api/galleries/country/fra`](https://comp-4513-assignment-1-qgjq.onrender.com/api/galleries/country/fra)
- [🔗 `/api/artists`](https://comp-4513-assignment-1-qgjq.onrender.com/api/artists)
- [🔗 `/api/artists/12`](https://comp-4513-assignment-1-qgjq.onrender.com/api/artists/12)
- [🔗 `/api/artists/1223423`](https://comp-4513-assignment-1-qgjq.onrender.com/api/artists/1223423)
- [🔗 `/api/artists/search/ma`](https://comp-4513-assignment-1-qgjq.onrender.com/api/artists/search/ma)
- [🔗 `/api/artists/search/mA`](https://comp-4513-assignment-1-qgjq.onrender.com/api/artists/search/mA)
- [🔗 `/api/artists/country/fra`](https://comp-4513-assignment-1-qgjq.onrender.com/api/artists/country/fra)

### 📌 **Part 2**

- [🔗 `/api/paintings`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings)
- [🔗 `/api/paintings/sort/year`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/sort/year)
- [🔗 `/api/paintings/63`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/63)
- [🔗 `/api/paintings/search/port`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/search/port)
- [🔗 `/api/paintings/search/pORt`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/search/pORt)
- [🔗 `/api/paintings/search/connolly`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/search/connolly)
- [🔗 `/api/paintings/years/1800/1850`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/years/1800/1850)
- [🔗 `/api/paintings/galleries/5`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/galleries/5)
- [🔗 `/api/paintings/artist/16`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/artist/16)
- [🔗 `/api/paintings/artist/666`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/artist/666)
- [🔗 `/api/paintings/artist/country/ital`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/artist/country/ital)

### 📌 **Part 3**

- [🔗 `/api/genres`](https://comp-4513-assignment-1-qgjq.onrender.com/api/genres)
- [🔗 `/api/genres/76`](https://comp-4513-assignment-1-qgjq.onrender.com/api/genres/76)
- [🔗 `/api/genres/painting/408`](https://comp-4513-assignment-1-qgjq.onrender.com/api/genres/painting/408)
- [🔗 `/api/genres/painting/jsdfhg`](https://comp-4513-assignment-1-qgjq.onrender.com/api/genres/painting/jsdfhg)
- [🔗 `/api/paintings/genre/78`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/genre/78)
- [🔗 `/api/paintings/era/2`](https://comp-4513-assignment-1-qgjq.onrender.com/api/paintings/era/2)
- [🔗 `/api/counts/genres`](https://comp-4513-assignment-1-qgjq.onrender.com/api/counts/genres)
- [🔗 `/api/counts/artists`](https://comp-4513-assignment-1-qgjq.onrender.com/api/counts/artists)
- [🔗 `/api/counts/topgenres/20`](https://comp-4513-assignment-1-qgjq.onrender.com/api/counts/topgenres/20)
- [🔗 `/api/counts/topgenres/2034958`](https://comp-4513-assignment-1-qgjq.onrender.com/api/counts/topgenres/2034958)

## 📜 Acknowledgment

This project was developed with the assistance of **ChatGPT**, an AI language model created by OpenAI.

## 📞 Contact

For any issues, feel free to reach out:

- GitHub: [JustinSerrano](https://github.com/JustinSerrano)
- Email: justin.serrano1015@gmail.com
