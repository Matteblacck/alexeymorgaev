import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TbArrowUpRight, TbX } from "react-icons/tb";
import { fluidText } from "../05-shared/utils";
import { useLanguage } from "../05-shared/useLanguage";
import { revealOnScroll } from "../05-shared/revealOnScroll";

type ExperienceProject = {
  title: string;
  brief: string;
  experience: {
    title: string;
    text: string | string[];
  }[];
  stack?: string[];
};

type ExperienceItem = {
  company: string;
  location?: string;
  period: string;
  duration: string;
  role: string;
  domain?: string;
  summary: string;
  highlights: string[];
  projects: ExperienceProject[];
  stack: {
    label: string;
    items: string[];
  }[];
};

const experiencesRu: ExperienceItem[] = [
  {
    company: "Строительная CRM",
    period: "Февраль 2026 — Сентябрь 2026",
    duration: "8 месяцев",
    role: "Fullstack-разработчик",
    domain: "SaaS/PWA, CRM для управления строительством",
    summary:
      "CRM для управления строительством: единое пространство для проектов, задач, команды, файлов, коммуникации и финансов.",
    highlights: [
      "Помог превратить разрозненное ведение объектов в единый цифровой процесс от старта проекта до сдачи работ.",
      "Сделал прозрачным контроль этапов, задач, сроков, ответственных и статусов для команды и руководителей.",
      "Реализовал коммуникацию внутри проекта, чтобы обсуждения, файлы и решения не терялись в сторонних мессенджерах.",
      "Развивал клиентский доступ: заказчик мог следить за прогрессом без полного доступа к внутренней кухне команды.",
      "Настроил окружения, CI/CD и тестирование, чтобы проект можно было стабильно развивать и выпускать.",
    ],
    projects: [
      {
        title: "CRM платформа для управления строительством",
        brief:
          "",
        experience: [
          {
            title: "Frontend",
            text: [
              "Разрабатывал интерфейс на Next.js и TypeScript, через который строительная команда ведёт работу каждый день: кабинет управление проектами, канбан-доска с ходом работ, интерфейс для работы с медиафайлами, чаты. Реализовал техподдержку на сайте и изолированное пространтсво для операторов техподдержки.",
              "Реализовал гостевой доступ, для возможности выдавать временный ограниченый доступ к проекту третьим сторонам, в зависимости от нужного им доступа.",
              "Особый акцент был сделан на мобильной версии приложения: реализовал PWA-обёртку, значительно переработал навигацию и дизайн для более удобной работы с мобильных уcтройств. Реализовал удобную навигацию в нижней части экрана и перенес функциональные кнопки в нижнюю область экрана, отдельные страницы собрал с нуля.",
              "Для работы с серверными данными использовал TanStack Query, чтобы интерфейс быстро обновлялся и оставался предсказуемым при большом количестве сущностей. Сделал сценарии управления проектом понятными для всех участников строительства, а статусы задач и этапов быстрыми для просмотра и обновления.",
              
            ],
          },
          {
            title: "Backend",
            text: [
              "Проектировал сервисы на NestJS с PostgreSQL вокруг реальных бизнес-сущностей строительной компании: проекты, роли и права доступа, учёт финансов, взаимодействие работников и клиентов.",
              "Проектировал схему PostgreSQL: описывал связи между пользователями, организациями, проектами, участниками, этапами, задачами, файлами, чатами и финансовыми операциями; добавлял миграции, индексы для частых запросов, soft-delete и архивирование данных.",
              "Настраивал валидацию входящих данных, единый формат ошибок через exception filters, rate limiting для auth-сценариев, логирование запросов и ошибок, Swagger/OpenAPI-документацию.",
              "Реализовал гибкую систему прав, чтобы сотрудники, руководители, клиенты и администраторы видели только нужные им данные и действия. Развивал realtime-слой на Socket.IO для чатов, событий проекта и уведомлений, чтобы команда быстрее реагировала на изменения по объекту.",
              "Настроил загрузку и хранение фото, документов и вложений через S3-объектное хранилище. Проработал SaaS-модель продукта: подписки, trial/demo-доступ, ограничения функциональности при неактивной подписке, гостевые ссылки для клиентов и системную админку для управления платформой.",
            ],
          },
          {
            title: "DevOps / Infrastructure",
            text: [
              "Подготовил 3 конфига Docker, чтобы проект можно было одинаково предсказуемо запускать в среде разработки, тестирования и в проде.",
              "Подготовил проект к деплою: настроил nginx конфиги, организовал ci/cd, настроил бэкапы базы данных, написал документацию по работе с сервером.",
  
             
            ],
          },
  
        ],
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "TanStack Query",
          "Redux Toolkit",
          "NextAuth",
          "Axios",
          "React Hook Form",
          "MUI",
          "PWA",
        ],
      },
      {
        label: "Backend",
        items: [
          "NestJS",
          "TypeScript",
          "PostgreSQL",
          "Prisma ORM",
          "Socket.IO",
          "JWT",
          "Swagger",
          "S3",
          "Multer",
          "Sharp",
          "SMTP",
          "Web Push",
        ],
      },
      {
        label: "DevOps",
        items: [
          "Docker",
          "Nginx",
          "GitLab CI",
          "Jest",
          "Cypress",
          "k6",
        ],
      },
    ],
  },
  {
    company: "CN-IRK Logistics",
    location: "Москва",
    period: "Июнь 2025 — январь 2026",
    duration: "7 месяцев",
    role: "Fullstack-разработчик",
    domain: "Перевозки, логистика, склад.",
    summary:
      "Сервис логистики товаров из Китая: личный кабинет, админ-панель, заказы и коммуникация с операторами.",
    highlights: [
      "Спроектировал backend на NestJS с модульной и чистой архитектурой.",
      "Разработал frontend на Next.js с применением FSD.",
      "Обернул приложение в PWA для более удобной работы с мобильных устройств.",
      "Реализовал чаты между пользователями и операторами площадки.",
      "Внедрил Unit и E2E-тестирование для ключевых бизнес-сценариев.",
      "Организовал Docker-окружения и CI/CD на GitLab.",
    ],
    projects: [
      {
        title: "Сервис логистики товаров из Китая",
        brief:
          "Проект для логистики товаров из Китая: оформление и сопровождение заказов, личный кабинет клиента, коммуникация с операторами площадки, админ-панель и внутренняя отчётность команды.",
        experience: [
          {
            title: "Frontend-опыт",
            text: [
              "Разработал клиентскую часть на Next.js с применением FSD: лендинг, личный кабинет, админ-панель и пользовательские сценарии работы с заказами.",
              "Обернул приложение в PWA, чтобы сервисом было удобнее пользоваться с мобильных устройств. Значительно улучшил производительность и SEO главной страницы за счёт Server-Side Rendering.",
              "Реализовал чаты между пользователями и операторами площадки, а также админ-панель с ограниченным доступом на базе React Query: управление заказами с фильтрацией и настройка общих параметров системы.",
            ],
          },
          {
            title: "Backend-опыт",
            text: [
              "Спроектировал backend на NestJS с использованием модульной и чистой архитектуры, продумал структуру API и работу с данными через PostgreSQL и Prisma.",
              "Внедрил Unit и E2E-тестирование, обеспечив надёжность ключевых бизнес-сценариев. Настроил OAuth-авторизацию через VK с безопасным управлением токенами.",
              "Реализовал интеграцию с Notion для автоматической синхронизации данных и отчётности. Организовал Docker-окружения для dev, test и prod и настроил CI/CD на GitLab.",
            ],
          },
        ],
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["Next.js", "React Query", "TypeScript", "Redux", "FSD", "MUI"],
      },
      {
        label: "Backend",
        items: ["NestJS", "Node.js", "PostgreSQL", "Prisma"],
      },
      {
        label: "DevOps",
        items: ["GitLab CI/CD", "Docker"],
      },
    ],
  },
  {
    company: "Sibdev",
    period: "Февраль 2024 — Июнь 2025",
    duration: "1 год 5 месяцев",
    role: "Frontend-разработчик",
    summary:
      "Клиентские части продуктовых проектов: игровая биржа и краудфандинговая платформа для школ.",
    highlights: [
      "Обновил дизайн интерфейса и перевёл проект на FSD-архитектуру.",
      "Реализовал каталог с фильтрацией и сортировкой.",
      "Настроил систему авторизации, сократив время входа пользователей.",
      "Добавил чаты на WebSocket для мгновенной коммуникации.",
      "Запустил клиентскую часть краудфандинговой платформы с нуля.",
    ],
    projects: [
      {
        title: "Out Game",
        brief:
          "Out Game — биржа внутриигровых предметов, где пользователи ищут товары, общаются внутри площадки и быстрее закрывают сделки.",
        experience: [
          {
            title: "Мой опыт",
            text:
              "Провел обновление дизайна интерфейса и перевёл проект на FSD-архитектуру, упростив поддержку и развитие. Реализовал каталог с фильтрацией и сортировкой, благодаря чему поиск нужных товаров стал занимать секунды. Настроил систему авторизации, сократив время входа для пользователей. Добавил чаты на WebSocket, благодаря чему сделки стали заключаться быстрее за счёт мгновенной коммуникации. Оптимизировал подгрузку и отрисовку больших списков, вследствие чего страница стала работать заметно быстрее даже при большом объёме данных.",
          },
        ],
        stack: ["React", "TypeScript", "Redux Toolkit", "WebSocket", "REST API"],
      },
      {
        title: "I Love School",
        brief:
          "I Love School — краудфандинговая платформа для школ: проектные страницы, сбор заявок и онлайн-пожертвования.",
        experience: [
          {
            title: "Мой опыт",
            text:
              "Разрабатывал клиентскую часть с нуля: главная и проектные страницы, форма подачи заявок с сохранением черновиков. Сделал процесс подачи заявки максимально удобным: пользователи могут сохранять черновики, возвращаться к ним позже и редактировать без потери данных, что повышает конверсию и снижает количество ошибок при заполнении формы. Подключил онлайн-платежи через CloudPayments, обеспечив безопасные и быстрые пожертвования. Реализовал адаптивную и кроссбраузерную верстку, благодаря чему платформа стала доступна на любых устройствах.",
          },
        ],
        stack: ["React", "TypeScript", "Redux Toolkit", "REST API"],
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Redux Toolkit", "WebSocket", "REST API"],
      },
      {
        label: "Architecture",
        items: ["FSD", "Adaptive UI", "Cross-browser layout"],
      },
    ],
  },
  {
    company: "ЛитРес",
    location: "Москва",
    period: "Январь 2023 — Январь 2024",
    duration: "1 год 1 месяц",
    role: "Frontend-разработчик",
    domain:
      "Информационные технологии, системная интеграция, интернет",
    summary:
      "Авторский кабинет «ЛитРес: Самиздат» и интерфейсы для авторов платформы.",
    highlights: [
      "Разработал дашборд аналитики для авторов.",
      "Создал центр уведомлений для продаж, начисления роялти и новостей платформы.",
      "Оптимизировал производительность интерфейсов при работе с большими массивами данных.",
    ],
    projects: [
      {
        title: "ЛитРес: Самиздат",
        brief:
          "«ЛитРес: Самиздат» — платформа для самостоятельной публикации книг, где авторы управляют произведениями, отслеживают продажи, спрос и важные события по аккаунту.",
        experience: [
          {
            title: "Мой опыт",
            text:
              "В рамках развития авторского кабинета моя основная работа была направлена на повышение удобства использования платформы авторами. Разработанный дашборд аналитики предоставил авторам возможность отслеживать динамику продаж, читательского спроса и доходности своих книг. Это позволило им анализировать заинтересованность читателей. Также я создал центр уведомлений, тем самым сократив время реакции авторов на важные события: продажи, начисления роялти и новости платформы. Оптимизировал производительность интерфейсов, что снизило время отклика системы и повысило удовлетворенность пользователей при работе с большими массивами данных.",
          },
        ],
      },
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Redux Toolkit"],
      },
    ],
  },
];

const experiencesEn: ExperienceItem[] = [
  {
    company: "CRM platform",
    period: "February 2026 - September 2026",
    duration: "8 months",
    role: "Fullstack Developer",
    domain: "SaaS/PWA, construction management CRM",
    summary:
      "A construction management CRM: one workspace for projects, tasks, teams, files, communication, and finances.",
    highlights: [
      "Helped turn fragmented site management into one digital workflow from project launch to handover.",
      "Made stages, tasks, deadlines, owners, and statuses transparent for teams and managers.",
      "Built project communication so discussions, files, and decisions would not get lost in external messengers.",
      "Developed client access so customers could track progress without seeing the team's internal workspace.",
      "Set up environments, CI/CD, and testing so the product could be developed and released steadily.",
    ],
    projects: [
      {
        title: "Construction management CRM platform",
        brief:
          "A SaaS/PWA CRM platform for construction and renovation companies. The app helps manage a site from start to handover: create projects, split them into stages, assign tasks, control deadlines, store photos and documents, communicate in project chats, track finances, and give clients limited guest access.",
        experience: [
          {
            title: "Frontend",
            text: [
              "Built the Next.js and TypeScript interface that construction teams use every day: project management, Kanban tasks and work progress, project media, team chats, a shared chat, and finance sections.",
              "Used TanStack Query and Redux Toolkit for server data so the interface stayed fast and predictable with many project entities. Made project workflows clear for construction participants and made statuses quick to review and update.",
              "Implemented guest access so clients could see site progress and materials without access to internal data. Also worked on support chat and a separate workspace for support employees.",
              "Put special focus on the mobile version: added the PWA wrapper and reworked navigation and UI for more convenient on-site mobile use.",
            ],
          },
          {
            title: "Backend",
            text: [
              "Designed the NestJS backend with PostgreSQL around real construction-company entities: projects, roles and permissions, finance tracking, worker and client interaction.",
              "Designed the PostgreSQL schema: described relations between users, organizations, projects, members, stages, tasks, files, chats, and financial operations; added migrations, indexes for frequent queries, soft-delete, and data archiving.",
              "Configured input validation with class-validator and ValidationPipe, a unified error format through exception filters, rate limiting for auth flows, request and error logging, and Swagger/OpenAPI documentation for the REST API.",
              "Implemented a flexible permissions system so employees, managers, clients, and administrators saw only the data and actions they needed. Developed the realtime layer with Socket.IO for chats, project events, and notifications so the team could react faster to site changes.",
              "Built photo, document, and attachment uploads through S3-compatible object storage. Worked through the SaaS model: subscriptions, trial/demo access, feature limits for inactive subscriptions, guest links for clients, and a system admin panel for managing the platform.",
            ],
          },
          {
            title: "DevOps / Infrastructure",
            text: [
              "Prepared 3 Docker configs so the project could run predictably in development, testing, and production environments.",
              "Prepared the project for deployment: configured nginx, organized CI/CD, set up database backups, and wrote server-operation documentation.",
            ],
          },
        ],
      },
    ],
    stack: experiencesRu[0].stack,
  },
  {
    company: "CN-IRK Logistics",
    location: "Moscow",
    period: "June 2025 - January 2026",
    duration: "7 months",
    role: "Fullstack Developer",
    domain: "Transportation, logistics, warehousing.",
    summary:
      "A logistics service for goods from China: user account, admin panel, orders, and communication with operators.",
    highlights: [
      "Designed the NestJS backend with modular, clean architecture.",
      "Built the Next.js frontend using FSD.",
      "Wrapped the app as a PWA for better mobile usage.",
      "Implemented chats between users and platform operators.",
      "Introduced Unit and E2E testing for key business scenarios.",
      "Organized Docker environments and CI/CD on GitLab.",
    ],
    projects: [
      {
        title: "Logistics service for goods from China",
        brief:
          "A project for logistics from China: order creation and tracking, customer account, communication with platform operators, admin panel, and internal team reporting.",
        experience: [
          {
            title: "Frontend experience",
            text: [
              "Built the client side with Next.js and FSD: landing page, personal account, admin panel, and user flows for working with orders.",
              "Wrapped the app as a PWA so the service was easier to use from mobile devices. Significantly improved performance and SEO of the main page with Server-Side Rendering.",
              "Implemented chats between users and operators, plus a restricted admin panel based on React Query: order management with filtering and shared system settings.",
            ],
          },
          {
            title: "Backend experience",
            text: [
              "Designed the NestJS backend with modular and clean architecture, planned the API structure, and worked with data through PostgreSQL and Prisma.",
              "Added Unit and E2E testing to make key business flows reliable. Configured VK OAuth authorization with secure token handling.",
              "Integrated Notion for automatic data and reporting synchronization. Organized Docker environments for dev, test, and prod, and configured CI/CD on GitLab.",
            ],
          },
        ],
      },
    ],
    stack: experiencesRu[1].stack,
  },
  {
    company: "Sibdev",
    period: "February 2024 - June 2025",
    duration: "1 year 5 months",
    role: "Frontend Developer",
    summary:
      "Client-side product work: a gaming marketplace and a crowdfunding platform for schools.",
    highlights: [
      "Updated the interface design and migrated the project to FSD architecture.",
      "Implemented a catalog with filtering and sorting.",
      "Configured authorization and reduced user login time.",
      "Added WebSocket chats for instant communication.",
      "Launched the client side of a crowdfunding platform from scratch.",
    ],
    projects: [
      {
        title: "Out Game",
        brief:
          "Out Game is a marketplace for in-game items where users find products, communicate inside the platform, and close deals faster.",
        experience: [
          {
            title: "My experience",
            text:
              "Updated the interface design and migrated the project to FSD architecture, making support and development simpler. Implemented a catalog with filtering and sorting, so users could find the right items in seconds. Configured authorization and reduced login time. Added WebSocket chats, helping deals close faster through instant communication. Optimized loading and rendering of large lists, making pages noticeably faster even with large amounts of data.",
          },
        ],
        stack: experiencesRu[2].projects[0].stack,
      },
      {
        title: "I Love School",
        brief:
          "I Love School is a crowdfunding platform for schools: project pages, application collection, and online donations.",
        experience: [
          {
            title: "My experience",
            text:
              "Built the client side from scratch: home page, project pages, and an application form with draft saving. Made the application flow more convenient: users can save drafts, return later, and edit without losing data, improving conversion and reducing form errors. Integrated online payments through CloudPayments for secure and fast donations. Implemented responsive and cross-browser layout so the platform works across devices.",
          },
        ],
        stack: experiencesRu[2].projects[1].stack,
      },
    ],
    stack: experiencesRu[2].stack,
  },
  {
    company: "LitRes",
    location: "Moscow",
    period: "January 2023 - January 2024",
    duration: "1 year 1 month",
    role: "Frontend Developer",
    domain: "Information technology, systems integration, internet",
    summary:
      "The LitRes: Samizdat author dashboard and interfaces for platform authors.",
    highlights: [
      "Built an analytics dashboard for authors.",
      "Created a notification center for sales, royalty accruals, and platform news.",
      "Optimized interface performance when working with large datasets.",
    ],
    projects: [
      {
        title: "LitRes: Samizdat",
        brief:
          "LitRes: Samizdat is a self-publishing platform where authors manage books, track sales, monitor reader demand, and follow important account events.",
        experience: [
          {
            title: "My experience",
            text:
              "While developing the author dashboard, my main focus was improving usability for authors. The analytics dashboard gave authors a way to track sales dynamics, reader demand, and book revenue. This helped them understand reader interest. I also created a notification center, reducing author response time to important events: sales, royalty accruals, and platform news. Optimized interface performance, lowering response time and improving user satisfaction when working with large datasets.",
          },
        ],
      },
    ],
    stack: experiencesRu[3].stack,
  },
];

const SectionContainer = styled.section`
  width: 100%;
  position: relative;
  padding-top: 26vh;
  padding-bottom: 12vh;
  background: transparent;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  padding: 20px;
`;

const marquee = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const marqueeReverse = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const MarqueeWrapper = styled.div`
  width: 150%;
  overflow: hidden;
  white-space: nowrap;
  padding: 10px 0;
  position: absolute;
  z-index: 1;
  opacity: 0.8;
  margin-left: -10%;
  margin-right: -10%;
`;

const MarqueeTextWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "reverse",
})<{ reverse: boolean }>`
  display: flex;
  animation: ${({ reverse }) => (reverse ? marqueeReverse : marquee)}
    ${({ reverse }) => (reverse ? "22s" : "65s")} linear infinite;
`;

const MarqueeText = styled.div`
  font-size: 24px;
  font-weight: 500;
  white-space: nowrap;
  padding-right: 20px;
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 420px);
  gap: 32px;
  align-items: end;
  max-width: 1180px;
  margin: 0 auto 10vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin-bottom: 7vh;
  }
`;

const Title = styled.h2`
  color: var(--text);
  font-size: ${fluidText(92, 42)};
  font-weight: 700;
  line-height: 0.92;
  text-transform: uppercase;
  max-width: 720px;
`;

const ExperienceList = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  max-width: 1180px;
  margin: 0 auto;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

const ExperienceCard = styled(motion.button)<{ $index: number }>`
  grid-column: ${({ $index }) => ($index % 2 === 0 ? "1 / span 8" : "5 / span 8")};
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 22px;
  min-height: 260px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.28);
  color: var(--text);
  text-align: left;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent, rgba(215, 255, 53, 0.16), transparent);
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 0.3s ease, transform 0.6s ease;
  }

  &:hover,
  &:focus-visible {
    border-color: var(--highlited-text);
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-6px);
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: translateX(100%);
  }

  @media (max-width: 900px) {
    grid-column: auto;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    min-height: 0;
    padding: 20px;
  }
`;

const CardAside = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
`;

const CardIndex = styled.span`
  display: block;
  color: var(--highlited-text);
  font-size: ${fluidText(62, 40)};
  font-weight: 700;
  line-height: 0.9;
`;

const CardPeriod = styled.span`
  display: block;
  color: var(--text);
  font-size: ${fluidText(16, 13)};
  font-weight: 500;
  line-height: 1.25;
  opacity: 0.68;
  text-transform: uppercase;
`;

const CardMain = styled.div`
  position: relative;
  z-index: 2;
  min-width: 0;
`;

const Company = styled.h3`
  font-size: ${fluidText(42, 28)};
  font-weight: 700;
  line-height: 1;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Role = styled.p`
  color: var(--highlited-text);
  font-size: ${fluidText(24, 18)};
  font-weight: 500;
  line-height: 1.15;
  margin-bottom: 14px;
`;

const Summary = styled.p`
  color: var(--text);
  font-size: ${fluidText(18, 15)};
  line-height: 1.35;
  opacity: 0.78;
  max-width: 680px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 5px 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: var(--text);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
  opacity: 0.86;
`;

const More = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 24px;
  color: var(--text);
  font-size: ${fluidText(16, 14)};
  font-weight: 600;
  text-transform: uppercase;

  svg {
    width: 20px;
    height: 20px;
    color: var(--highlited-text);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(0, 0, 0, 0.86);
  backdrop-filter: blur(12px);
  overflow-y: auto;
`;

const ModalContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  padding: 28px;
  color: var(--text);

  @media (max-width: 640px) {
    padding: 18px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding-bottom: 28px;
`;

const ModalEyebrow = styled.p`
  color: var(--highlited-text);
  font-size: ${fluidText(18, 14)};
  font-weight: 600;
  text-transform: uppercase;
`;

const ModalTitle = styled.h3`
  max-width: 900px;
  font-size: ${fluidText(88, 40)};
  font-weight: 700;
  line-height: 0.92;
  text-transform: uppercase;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;

  svg {
    width: 26px;
    height: 26px;
  }

  &:hover,
  &:focus-visible {
    border-color: var(--highlited-text);
    color: var(--highlited-text);
    transform: rotate(90deg);
    outline: none;
  }
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 0.32fr) minmax(0, 1fr);
  gap: 28px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const MetaPanel = styled.aside`
  position: sticky;
  top: 28px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);

  @media (max-width: 860px) {
    position: static;
  }
`;

const MetaItem = styled.div`
  span {
    display: block;
    color: var(--highlited-text);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  p {
    color: var(--text);
    font-size: ${fluidText(20, 16)};
    font-weight: 500;
    line-height: 1.2;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Block = styled.section`
  padding: 28px;
  border-left: 3px solid var(--highlited-text);
  background: rgba(255, 255, 255, 0.04);
  border-radius: 0 8px 8px 0;

  @media (max-width: 640px) {
    padding: 22px;
  }
`;

const BlockTitle = styled.h4`
  font-size: ${fluidText(30, 22)};
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 14px;
  text-transform: uppercase;
`;

const BlockText = styled.p`
  font-size: ${fluidText(21, 16)};
  line-height: 1.45;
  opacity: 0.84;
`;

const ExperienceDetails = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 22px;
`;

const ExperienceDetail = styled.div`
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
`;

const ExperienceDetailTitle = styled.h5`
  color: var(--highlited-text);
  font-size: ${fluidText(22, 18)};
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ParagraphGroup = styled.div`
  display: grid;
  gap: 14px;
`;

const StackGroup = styled.div`
  display: grid;
  gap: 16px;
`;

const StackTitle = styled.p`
  color: var(--highlited-text);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: 30, transition: { duration: 0.2 } },
};

export default function Experience() {
  const { language } = useLanguage();
  const experiences = language === "en" ? experiencesEn : experiencesRu;
  const sectionRef = useRef<HTMLElement>(null);
  const [reverseMarquee, setReverseMarquee] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const marqueeText = "WORK EXPERIENCE ";

  useEffect(() => {
    return revealOnScroll(sectionRef.current, [
      { selector: ".experience-hidden", visibleClass: "visible2" },
    ]);
  }, [language]);

  useEffect(() => {
    setSelectedExperience(null);
  }, [language]);

  useEffect(() => {
    if (selectedExperience) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
    };
  }, [selectedExperience]);

  return (
    <>
      <SectionContainer ref={sectionRef} id="experience">
        <MarqueeWrapper
          style={{
            transform: "rotate(-16deg)",
            marginTop: "33vh",
            opacity: "0.28",
          }}
          onMouseEnter={() => setReverseMarquee(true)}
          onMouseLeave={() => setReverseMarquee(false)}
        >
          <MarqueeTextWrapper
            key={reverseMarquee ? "reverse" : "normal"}
            reverse={reverseMarquee}
          >
            <MarqueeText>{marqueeText.repeat(1000)}</MarqueeText>
          </MarqueeTextWrapper>
        </MarqueeWrapper>

        <Container>
          <HeaderRow>
            <Title className="experience-hidden hidden2">EXPERIENCE</Title>
          </HeaderRow>

          <ExperienceList>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                $index={index}
                className="experience-hidden hidden2"
                type="button"
                onClick={() => setSelectedExperience(experience)}
                whileTap={{ scale: 0.98 }}
              >
                <CardAside>
                  <CardIndex>{String(index + 1).padStart(2, "0")}</CardIndex>
                  <CardPeriod>
                    {experience.period}
                    <br />
                    {experience.duration}
                  </CardPeriod>
                </CardAside>

                <CardMain>
                  <Company>{experience.company}</Company>
                  <Role>{experience.role}</Role>
                  <Summary>{experience.summary}</Summary>
                  <Tags>
                    {experience.stack
                      .flatMap((group) => group.items)
                      .slice(0, 6)
                      .map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                  </Tags>
                  <More>
                    {language === "en" ? "More details" : "Подробнее"}
                    <TbArrowUpRight />
                  </More>
                </CardMain>
              </ExperienceCard>
            ))}
          </ExperienceList>
        </Container>
      </SectionContainer>

      <AnimatePresence mode="wait">
        {selectedExperience && (
          <ModalOverlay
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalContainer
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalHeader>
                <div>
                  <ModalEyebrow>{selectedExperience.role}</ModalEyebrow>
                  <ModalTitle>{selectedExperience.company}</ModalTitle>
                </div>
                <CloseButton
                  type="button"
                  onClick={() => setSelectedExperience(null)}
                  aria-label={language === "en" ? "Close experience" : "Закрыть опыт"}
                >
                  <TbX />
                </CloseButton>
              </ModalHeader>

              <ModalGrid>
                <MetaPanel>
                  <MetaItem>
                    <span>{language === "en" ? "Period" : "Период"}</span>
                    <p>{selectedExperience.period}</p>
                  </MetaItem>
                  <MetaItem>
                    <span>{language === "en" ? "Duration" : "Длительность"}</span>
                    <p>{selectedExperience.duration}</p>
                  </MetaItem>
                  {selectedExperience.location && (
                    <MetaItem>
                      <span>{language === "en" ? "Location" : "Локация"}</span>
                      <p>{selectedExperience.location}</p>
                    </MetaItem>
                  )}
                  {selectedExperience.domain && (
                    <MetaItem>
                      <span>{language === "en" ? "Domain" : "Сфера"}</span>
                      <p>{selectedExperience.domain}</p>
                    </MetaItem>
                  )}
                </MetaPanel>

                <ModalContent>
                  {selectedExperience.projects.map((project) => (
                    <Block key={project.title}>
                      <BlockTitle>{project.title}</BlockTitle>
                      <BlockText>{project.brief}</BlockText>
                      <ExperienceDetails>
                        {project.experience.map((item) => (
                          <ExperienceDetail key={item.title}>
                            <ExperienceDetailTitle>
                              {item.title}
                            </ExperienceDetailTitle>
                            {Array.isArray(item.text) ? (
                              <ParagraphGroup>
                                {item.text.map((paragraph) => (
                                  <BlockText key={paragraph}>
                                    {paragraph}
                                  </BlockText>
                                ))}
                              </ParagraphGroup>
                            ) : (
                              <BlockText>{item.text}</BlockText>
                            )}
                          </ExperienceDetail>
                        ))}
                      </ExperienceDetails>
                      {project.stack && (
                        <Tags>
                          {project.stack.map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </Tags>
                      )}
                    </Block>
                  ))}

                  <Block>
                    <BlockTitle>Stack</BlockTitle>
                    <StackGroup>
                      {selectedExperience.stack.map((group) => (
                        <div key={group.label}>
                          <StackTitle>{group.label}</StackTitle>
                          <Tags>
                            {group.items.map((item) => (
                              <Tag key={item}>{item}</Tag>
                            ))}
                          </Tags>
                        </div>
                      ))}
                    </StackGroup>
                  </Block>
                </ModalContent>
              </ModalGrid>
            </ModalContainer>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
