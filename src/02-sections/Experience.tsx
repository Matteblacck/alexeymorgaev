import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styled, { keyframes } from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { TbClick, TbHandClick, TbX } from "react-icons/tb";
import { fluidText } from "../05-shared/utils";
import { techIcons } from "../05-shared/Icons";
import { useLanguage } from "../05-shared/useLanguage";
import { revealOnScroll } from "../05-shared/revealOnScroll";
import {
  scrollToElement,
  startSmoothScroll,
  stopSmoothScroll,
} from "../05-shared/smoothScroll";

const idCardSrc = `${import.meta.env.BASE_URL}images/idcard.webp`;
const dugaSrc = `${import.meta.env.BASE_URL}images/duga.webp`;

const technologyIconKeys: Record<string, string> = {
  "next.js": "nextjs",
  "react query": "reactQuery",
  "tanstack query": "reactQuery",
  "redux toolkit": "redux",
  redux: "redux",
  nextauth: "nextAuth",
  "react hook form": "react",
  mui: "mui",
  pwa: "api",
  nestjs: "nestjs",
  "node.js": "nodejs",
  postgresql: "postgresql",
  "prisma orm": "prisma",
  prisma: "prisma",
  "socket.io": "socketio",
  websocket: "socketio",
  jwt: "jwt",
  s3: "s3",
  smtp: "smtp",
  docker: "docker",
  nginx: "nginx",
  "gitlab ci": "gitlab",
  "gitlab ci/cd": "gitlab",
  jest: "jest",
  cypress: "cypress",
  k6: "k6",
  typescript: "typescript",
  react: "react",
  fsd: "fsd",
};

const getTechnologyIcon = (technology: string) =>
  techIcons[technologyIconKeys[technology.toLowerCase()] ?? "api"];

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
  durationMonths: number;
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
    company: "Платформа для управления строительством",
    period: "Февраль 2026 - Октябрь 2026",
    durationMonths: 9,
    role: "Fullstack-разработчик",
    domain: "SaaS/PWA, управление строительством",
    summary:
      "Платформа для строительных команд, объединяющая проекты, задачи, документы, коммуникацию и финансы в одном рабочем пространстве от планирования до сдачи объекта.",
    highlights: [
      "Объединил ключевые процессы строительного проекта: этапы, задачи, чек-листы, документы, коммуникацию и финансовый учёт.",
      "Сделал ход работ и ответственность по задачам наглядными для команды и руководителей через дашборды, Kanban и ленту событий.",
      "Реализовал гостевой доступ с настраиваемыми правами, чтобы заказчики и внешние участники видели нужную часть проекта без доступа ко всему рабочему пространству.",
      "Переработал мобильные сценарии и PWA для доступа к проектам и частым действиям прямо на строительной площадке.",
      "Разработал встроенный модуль технической поддержки: от создания и назначения обращения до переписки и закрытия с сохранением истории. Это помогает команде не терять запросы и даёт пользователю понятный статус их обработки.",
      "Подготовил основу для развития SaaS-продукта: подписки, trial/demo-доступ, ограничения функций и системная админ-панель.",
    ],
    projects: [
      {
        title: "Платформа для управления строительством",
        brief:
          "B2B решение для управления строительными проектами. Платформа связывает команды, руководителей и заказчиков вокруг актуального плана работ, проектных данных и коммуникации.",
        experience: [
          {
            title: "Frontend",
            text: [
              "Разрабатывал интерфейс на Next.js, React и TypeScript для ежедневной работы строительных команд. Реализовал личный кабинет и дашборды проектов, Kanban-доски, этапы работ, задачи, чек-листы, работу с документами и медиаматериалами. Ключевые сценарии по объекту собраны в одном рабочем пространстве.",
              "Настроил TanStack Query для серверного состояния, кэширования и синхронизации данных между экранами. Использовал Redux Toolkit, NextAuth, Axios, React Hook Form и MUI для управления состоянием, авторизации, сетевыми запросами и формами.",
              "Переработал мобильную версию приложения: реализовал PWA-режим, нижнюю навигацию и мобильную панель действий, а отдельные страницы собрал с нуля. Частые операции и актуальные данные проекта стали доступны команде с телефона на объекте.",
              "Разработал пользовательский интерфейс встроенной технической поддержки. Клиент создаёт обращение первым сообщением, видит его номер, статус, переписку и непрочитанные сообщения, а активные и завершённые запросы доступны в отдельных списках. Так пользователь понимает, что происходит с его запросом, и может вернуться к полной истории диалога.",
              "Для операторов создал отдельное рабочее место с очередями новых нераспределённых, назначенных им, взятых в работу и архивных обращений. Оператор принимает тикет, общается с клиентом в realtime-чате и может закрыть или повторно открыть запрос. Это отделяет техническую поддержку от рабочих задач строительной команды и закрепляет ответственность за каждым обращением.",
              "Также реализовал интерфейсы проектных чатов, уведомлений и финансового учёта, чтобы ежедневная работа команды и клиентская коммуникация оставались в одном продукте.",
              "Реализовал гостевой интерфейс для заказчиков и внешних участников: доступ выдаётся по временной ссылке и ограничивается выбранными данными и действиями, без добавления гостя во внутреннюю команду проекта.",
            ],
          },
          {
            title: "Backend",
            text: [
              "Развивал backend на NestJS, организованный в 42 доменных модуля. Модульная структура разделяет бизнес-области платформы и упрощает их независимое развитие.",
              "Проектировал схему PostgreSQL из 89 сущностей и подготовил 155 миграций. Добавлял индексы для частых запросов, soft-delete и архивирование, чтобы поддерживать производительность и сохранять историю проектных данных.",
              "Реализовал ролевую модель и granular permissions для сотрудников, руководителей, клиентов, администраторов и внешних пользователей. Права определяют доступные данные и действия на уровне проекта.",
              "Добавил гостевой доступ по временным ссылкам с настраиваемыми разрешениями, чтобы подключать заказчиков и подрядчиков только к нужной части проекта.",
              "Развивал realtime-функциональность на Socket.IO по четырём направлениям: чаты, этапы проектов, лента событий и уведомления. Обновления о ходе работ и коммуникации оперативно поступают участникам проекта.",
              "Реализовал загрузку фото, видео, документов и вложений в S3-совместимое хранилище. Добавил обработку изображений, изменение размеров и генерацию превью через Sharp.",
              "Реализовал SaaS-сценарии: trial/demo-доступ, подписки, ограничения функций и системную административную панель для управления платформой.",
              "Спроектировал доменную модель и API модуля технической поддержки: создание тикета из первого сообщения, назначение ответственного оператора и переходы между статусами от нового обращения до закрытия или отмены с возможностью повторного открытия. Добавил проверки доступа, чтобы управлять тикетом мог назначенный сотрудник, realtime-доставку сообщений, уведомления клиенту и команде, а также email о новых обращениях. Для системного администратора предусмотрел обзор тикетов в разрезе аккаунтов операторов. В результате запросы получают владельца и прослеживаемую историю обработки.",
              "Настроил JWT-аутентификацию, валидацию DTO, единый формат ошибок через exception filters и rate limiting для auth-сценариев. Подготовил Swagger/OpenAPI-документацию и логирование запросов и ошибок.",
            ],
          },
          {
            title: "DevOps и тестирование",
            text: [
              "Подготовил три Docker Compose-окружения для development, test и production. Это обеспечивает воспроизводимый запуск и проверку приложения на разных этапах поставки.",
              "Настроил Nginx и GitLab CI/CD, резервное копирование базы данных и документацию по работе с сервером, чтобы стандартизировать деплой и обслуживание платформы.",
              "Добавил автоматизированные тесты на Jest и Cypress для проверки backend-логики и пользовательских сценариев.",
              "Подготовил три группы нагрузочных сценариев k6 для REST API, Socket.IO и multipart-загрузок, чтобы отдельно проверять производительность основных каналов работы с платформой.",
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
    period: "Июнь 2025 - январь 2026",
    durationMonths: 7,
    role: "Fullstack-разработчик",
    domain: "Перевозки, логистика, склад.",
    summary:
      "Сквозной сервис заказа и доставки товаров из Китая: от расчёта стоимости и оформления заявки до отслеживания статуса, связи с оператором и работы команды с заказами.",
    highlights: [
      "Собрал путь клиента в один сервис: расчёт ориентировочной стоимости, пошаговое оформление заказа, выбор доставки, личный кабинет и связь с оператором.",
      "Сделал этапы обработки заказа прозрачными для клиента: статусы от обработки и оплаты до отправки, выдачи и завершения отображаются в виде трека.",
      "Создал рабочее место команды для фильтрации и обновления заказов, включая статусы, цены, оплаты и даты, чтобы ключевые операционные данные были доступны в одном интерфейсе.",
      "Автоматизировал обмен данными между сайтом и Notion с очередью, пакетной обработкой и повторными попытками, сократив ручное дублирование заказов и рассинхронизацию отчётности.",
      "Подготовил PWA для мобильного доступа, а также Unit и E2E-проверки ключевых пользовательских сценариев.",
      "Настроил Docker-окружения и GitLab CI/CD для воспроизводимого запуска и поставки изменений.",
    ],
    projects: [
      {
        title: "Сервис логистики товаров из Китая",
        brief:
          "Клиентский и операционный сервис для заказа товаров из Китая. Он связывает расчёт стоимости, оформление заказа, отслеживание логистических этапов, поддержку оператора и административную работу с данными, помогая клиенту понимать следующий шаг, а команде вести заказы в едином процессе.",
        experience: [
          {
            title: "Frontend-опыт",
            text: [
              "Разработал клиентскую часть на Next.js и FSD: лендинг, личный кабинет, калькулятор, пошаговое оформление заказа и административный интерфейс. Клиент указывает товар, ссылку, цену и параметры, выбирает обычную или экспресс-доставку и прикладывает скриншот, а форма проверяет данные до отправки.",
              "Связал отображение стоимости с актуальными настройками курса и комиссии. Если курс успел измениться после заполнения формы, клиент получает обновлённый расчёт и подтверждает заказ заново, что снижает риск оформления по устаревшей цене.",
              "Сделал состояние заказа понятным без необходимости каждый раз уточнять его у оператора: карточка показывает этапы от обработки и оплаты до отправки, готовности к выдаче и завершения, а также стоимость и способ доставки.",
              "Реализовал чаты между пользователями и операторами, а также административную панель на React Query с фильтрацией заказов и настройкой общих параметров. Клиентский диалог и операционная работа доступны в интерфейсах, предназначенных для каждой роли.",
              "Адаптировал приложение для мобильного использования в формате PWA и применил Server-Side Rendering на главной странице для более быстрой первичной загрузки и индексации поисковыми системами.",
            ],
          },
          {
            title: "Backend-опыт",
            text: [
              "Спроектировал backend на NestJS с модульной и чистой архитектурой, API на PostgreSQL и Prisma. Реализовал создание и обновление заказов с проверкой владельца, валидацией данных и защитой от подтверждения по устаревшим настройкам курса.",
              "Связал заказы с операционными данными: статусами обработки, способом доставки, ценой, оплатой, прибылью и датами выкупа и получения. Административная команда может актуализировать эти поля, сохраняя данные заказа в согласованном виде.",
              "Реализовал двустороннюю интеграцию с Notion: новые и изменённые заказы синхронизируются с рабочей базой, а данные из Notion можно загружать обратно. Очередь обрабатывает записи пакетами и повторяет неудачные запросы, помогая поддерживать актуальность операционного учёта без ручного переноса каждого изменения.",
              "Внедрил Unit и E2E-проверки ключевых бизнес-сценариев и авторизацию через VK OAuth. Подготовил Docker-окружения для dev, test и prod и CI/CD на GitLab, чтобы упростить проверку и выпуск изменений.",
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
    period: "Февраль 2024 - Июнь 2025",
    durationMonths: 17,
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
          "Out Game, биржа внутриигровых предметов, где пользователи ищут товары, общаются внутри площадки и быстрее закрывают сделки.",
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
          "I Love School: краудфандинговая платформа для школ с проектными страницами, сбором заявок и онлайн-пожертвованиями.",
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
    period: "Январь 2023 - Январь 2024",
    durationMonths: 13,
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
          "«ЛитРес: Самиздат», платформа для самостоятельной публикации книг, где авторы управляют произведениями, отслеживают продажи, спрос и важные события по аккаунту.",
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

export const totalExperienceMonths = experiencesRu.reduce(
  (total, experience) => total + experience.durationMonths,
  0
);

const russianPlural = (count: number, forms: [string, string, string]) => {
  const remainder100 = count % 100;
  const remainder10 = count % 10;
  if (remainder100 >= 11 && remainder100 <= 14) return forms[2];
  if (remainder10 === 1) return forms[0];
  if (remainder10 >= 2 && remainder10 <= 4) return forms[1];
  return forms[2];
};

export function formatExperienceDuration(months: number, language: "en" | "ru") {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (language === "en") {
    return [
      years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : "",
      remainingMonths > 0 ? `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}` : "",
    ].filter(Boolean).join(" ");
  }

  return [
    years > 0 ? `${years} ${russianPlural(years, ["год", "года", "лет"])}` : "",
    remainingMonths > 0 ? `${remainingMonths} ${russianPlural(remainingMonths, ["месяц", "месяца", "месяцев"])}` : "",
  ].filter(Boolean).join(" ");
}

const experiencesEn: ExperienceItem[] = [
  {
    company: "Construction Management Platform",
    period: "February 2026 - October 2026",
    durationMonths: 9,
    role: "Fullstack Developer",
    domain: "SaaS/PWA construction management",
    summary:
      "A construction management platform for projects, tasks, documents, communication, and finances in one workspace, from planning through handover.",
    highlights: [
      "Brought core construction workflows, including stages, tasks, checklists, documents, communication, and financial tracking, into one product workspace.",
      "Made work progress and task ownership easier to review through project dashboards, Kanban boards, and a realtime event feed.",
      "Implemented scoped guest access so clients and external participants could see the parts of a project relevant to them without entering the internal workspace.",
      "Reworked mobile workflows and PWA access so teams could reach project information and frequent actions from the job site.",
      "Built SaaS foundations for subscriptions, trial/demo access, feature entitlements, and platform administration.",
      "Delivered an in-product technical support module covering ticket creation, operator assignment, conversation, and resolution, giving users a clear status and the team an accountable workflow.",
    ],
    projects: [
      {
        title: "Construction Management Platform",
        brief:
          "A B2B SaaS platform for construction management that brings project teams, managers, and clients together around current work plans, project data, and communication.",
        experience: [
          {
            title: "Frontend",
            text: [
              "Built the daily-use interface with Next.js, React, and TypeScript. Delivered user accounts and project dashboards, Kanban boards, work stages, tasks, checklists, and document and media workspaces. This brought core job workflows together in one product.",
              "Configured TanStack Query for server state, caching, and data synchronization across screens. Used Redux Toolkit, NextAuth, Axios, React Hook Form, and MUI for application state, authentication, network requests, and forms.",
              "Reworked the mobile app and implemented PWA mode, bottom navigation, and a mobile action bar; built several pages from scratch. This made project information and frequent actions accessible to teams working on site.",
              "Built the in-product technical support experience for platform users. Customers can open a ticket with their first message, see its number and status, follow the conversation and unread messages, and return to active or completed requests. This gives users a clear place to track an issue and keeps its context in one conversation.",
              "Created a dedicated support desk for operators with separate queues for unassigned, assigned to me, in-progress, and archived tickets. Operators can accept a request, reply in realtime, and close or reopen it. This keeps support work separate from construction workflows and gives each request a clear owner.",
              "Also built the project's team chat, notification, and financial tracking interfaces, keeping core team workflows and customer communication inside the same product.",
              "Implemented a guest-facing project interface for clients and external participants. Temporary links expose only the selected project data and actions, without adding guests to the internal team.",
            ],
          },
          {
            title: "Backend",
            text: [
              "Developed the NestJS backend across 42 domain modules. The modular structure separates product domains and supports evolving them independently.",
              "Designed and evolved a PostgreSQL schema with 89 data entities and prepared 155 migrations. Added indexes for frequent queries, soft-delete, and data archiving to support query performance and preserve project history.",
              "Implemented role-based access and granular permissions for employees, managers, clients, administrators, and external users, controlling which project data and actions each role can access.",
              "Added configurable guest access through temporary links, allowing clients and contractors to access only the project information they need without full membership.",
              "Developed Socket.IO realtime features across four areas: chats, project stages, the event feed, and notifications. Project updates and team communication reach participants as work changes.",
              "Implemented photo, video, document, and attachment uploads to S3-compatible storage. Added image processing, resizing, and thumbnail generation with Sharp.",
              "Built SaaS workflows for trial/demo access, subscriptions, feature entitlements, and a system administration panel.",
              "Designed the technical support domain and API, including ticket creation from the first message, operator assignment, and status transitions through open, in-progress, closed, or cancelled, with reopening supported. Added access checks so only the assigned operator can manage a ticket, realtime message delivery, in-app notifications to users and the support team, and email alerts for new tickets. System administrators can review tickets by support operator account. This creates clear ownership and a traceable history for every customer request.",
              "Configured JWT authentication, DTO validation, consistent errors through exception filters, and rate limiting for authentication flows. Prepared Swagger/OpenAPI documentation and request and error logging.",
            ],
          },
          {
            title: "DevOps & Testing",
            text: [
              "Prepared three Docker Compose environments for development, test, and production, enabling reproducible setup and validation throughout delivery.",
              "Configured Nginx and GitLab CI/CD, database backups, and server-operation documentation to standardize deployment and platform maintenance.",
              "Added automated tests with Jest and Cypress to verify backend behavior and key user workflows.",
              "Prepared three k6 load-test scenario groups for the REST API, Socket.IO, and multipart uploads to assess performance across the platform's main traffic paths.",
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
    durationMonths: 7,
    role: "Fullstack Developer",
    domain: "Transportation, logistics, warehousing.",
    summary:
      "An end-to-end service for ordering and delivering goods from China, covering price estimates, order submission, status tracking, operator communication, and team order management.",
    highlights: [
      "Brought the customer journey into one service: price estimation, guided order submission, delivery selection, a personal account, and operator communication.",
      "Made order progress easier for customers to understand with a visual lifecycle from processing and payment through shipping, pickup, and completion.",
      "Built an operations workspace for filtering and updating orders, including statuses, prices, payments, and dates, keeping key fulfillment data in one interface.",
      "Automated data exchange between the website and Notion with a queued, batched sync and retries, reducing duplicate entry and reporting drift.",
      "Prepared a PWA for mobile access and added Unit and E2E checks for key customer workflows.",
      "Configured Docker environments and GitLab CI/CD for repeatable setup and delivery.",
    ],
    projects: [
      {
        title: "Logistics service for goods from China",
        brief:
          "A customer and operations service for ordering goods from China. It connects price estimates, order submission, logistics tracking, operator support, and administrative workflows, helping customers understand what happens next while giving the team one process for managing orders.",
        experience: [
          {
            title: "Frontend experience",
            text: [
              "Built the customer-facing experience with Next.js and FSD: landing page, personal account, calculator, guided checkout, and admin interface. Customers provide an item link, price, and details, select standard or express delivery, and attach a screenshot, with form validation before submission.",
              "Connected displayed pricing to current exchange-rate and commission settings. If the rate changes while a customer is completing checkout, the app refreshes the estimate and asks them to confirm again, reducing the risk of orders being submitted with outdated pricing.",
              "Made order progress visible without requiring customers to ask an operator for every update. Order cards show the journey from processing and payment through shipping, pickup readiness, and completion, alongside the price and delivery method.",
              "Implemented customer-to-operator chats and a React Query admin panel with order filtering and shared settings. Customers and the operations team get interfaces suited to their respective workflows.",
              "Adapted the app for mobile use as a PWA and used Server-Side Rendering on the landing page to support faster initial rendering and search indexing.",
            ],
          },
          {
            title: "Backend experience",
            text: [
              "Designed the NestJS backend with modular, clean architecture, a PostgreSQL API, and Prisma. Implemented order creation and updates with ownership checks, input validation, and protection against confirming an order with stale pricing settings.",
              "Connected orders to operational data, including fulfillment status, delivery method, price, payment, profit, and purchase and receipt dates. The operations team can update these fields while keeping the order record consistent.",
              "Implemented two-way Notion synchronization: new and changed orders are synced to the operations database, and records can also be imported back from Notion. The queue processes records in batches and retries failed requests, helping keep operational tracking current without manually copying every update.",
              "Added Unit and E2E checks for key business flows and VK OAuth authentication. Prepared Docker environments for dev, test, and production, and GitLab CI/CD to streamline validation and delivery.",
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
    durationMonths: 17,
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
    durationMonths: 13,
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

const getCardTechnologies = (experience: ExperienceItem, index: number) => {
  const allTechnologies = experience.stack.flatMap((group) => group.items);
  if (index > 1) return allTechnologies.slice(0, 6);

  const frontend = experience.stack.find((group) => group.label.toLowerCase() === "frontend");
  const backend = experience.stack.find((group) => group.label.toLowerCase() === "backend");
  const devops = experience.stack.find((group) => group.label.toLowerCase() === "devops");
  if (!frontend || !backend || !devops) return allTechnologies.slice(0, 6);

  const backendCore = backend.items
    .filter((technology) => /^(nestjs|postgresql|prisma(?: orm)?)$/i.test(technology))
    .slice(0, 2);
  const devopsCore = devops.items
    .filter((technology) => /^(docker|nginx|gitlab ci(?:\/cd)?)$/i.test(technology))
    .slice(0, 3);

  return [...new Set([...frontend.items.slice(0, 3), ...backendCore, ...devopsCore])];
};

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
  display: flex;
  justify-content: flex-start;
  gap: clamp(0px, 0.5vw, 6px);
  align-items: center;
  max-width: 1180px;
  margin: 0 auto 10vh;

  @media (max-width: 768px) {
    gap: 12px;
    margin-bottom: 7vh;
  }
`;

const IdCardAnchor = styled.div`
  display: block;
  width: clamp(72px, 17vw, 175px);
  aspect-ratio: 1402 / 1122;
  flex: 0 0 auto;

  @media (max-width: 768px) {
    width: clamp(68px, 17vw, 128px);
  }

  @media (max-width: 420px) {
    width: clamp(54px, 16vw, 68px);
  }
`;

const Title = styled.h2`
  color: var(--text);
  font-size: ${fluidText(92, 42)};
  font-weight: 700;
  line-height: 0.92;
  text-transform: uppercase;
  max-width: 720px;
  min-width: 0;
  margin: 0;
  flex: 0 1 auto;
  opacity: 0;
  translate: 0 54px;
  filter: blur(12px);
  clip-path: inset(0 0 28% 0);
  transition:
    opacity 800ms cubic-bezier(0.16, 1, 0.3, 1),
    translate 1000ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 900ms ease,
    clip-path 1000ms cubic-bezier(0.16, 1, 0.3, 1);

  &.visible2 {
    opacity: 1;
    translate: 0 0;
    filter: blur(0);
    clip-path: inset(0);
  }

  @media (max-width: 420px) {
    font-size: clamp(28px, 9vw, 36px);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    translate: 0 0;
    filter: none;
    clip-path: none;
    transition: none;
  }
`;

const IdCardDecoration = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  display: block;
  width: clamp(72px, 17vw, 175px);
  height: auto;
  flex: 0 0 auto;
  margin-right: 0;
  rotate: -9deg;
  filter: drop-shadow(0 16px 24px rgba(179, 201, 135, 0.12));
  opacity: 0;
  translate: -32px 28px;
  scale: 0.82;
  pointer-events: none;
  transition:
    opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) 140ms,
    rotate 750ms cubic-bezier(0.16, 1, 0.3, 1) 140ms,
    translate 850ms cubic-bezier(0.16, 1, 0.3, 1) 140ms,
    scale 850ms cubic-bezier(0.16, 1, 0.3, 1) 140ms,
    filter 750ms ease 140ms;

  &.visible2 {
    opacity: 1;
    rotate: -9deg;
    translate: 0 0;
    scale: 1;
  }

  @media (max-width: 768px) {
    width: clamp(68px, 17vw, 128px);
  }

  @media (max-width: 420px) {
    width: clamp(54px, 16vw, 68px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    opacity: 1;
    translate: 0 0;
    scale: 1;
  }
`;

const ExperienceList = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 24px;
  row-gap: clamp(36px, 4vw, 56px);
  max-width: 1180px;
  margin: 0 auto;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
`;

const cardWave = keyframes`
  0%, 100% { translate: 0 0; rotate: 0deg; }
  12% { translate: 0 -1px; rotate: -0.2deg; }
  24%, 36% { translate: 0 0; rotate: 0deg; }
  48% { translate: 0 1px; rotate: 0.2deg; }
  60%, 72% { translate: 0 0; rotate: 0deg; }
`;

const ExperienceCard = styled(motion.button)<{ $index: number }>`
  grid-column: ${({ $index }) => ($index % 2 === 0 ? "1 / span 6" : "7 / span 6")};
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(24px, 3vw, 48px);
  min-height: 250px;
  padding: clamp(24px, 3vw, 38px) clamp(24px, 3.4vw, 44px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: clamp(14px, 1.5vw, 20px);
  background: #080907;
  color: var(--text);
  text-align: left;
  position: relative;
  overflow: visible;
  isolation: isolate;
  cursor: pointer;
  backdrop-filter: blur(6px);
  opacity: 0;
  translate: 0 76px;
  rotate: ${({ $index }) => ($index % 2 === 0 ? "-2.2deg" : "2.2deg")};
  scale: 0.94;
  filter: blur(12px) saturate(0.72);
  transform-origin: center top;
  transition:
    opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) ${({ $index }) => `${Math.min($index * 140, 560)}ms`},
    translate 1050ms cubic-bezier(0.16, 1, 0.3, 1) ${({ $index }) => `${Math.min($index * 140, 560)}ms`},
    rotate 1050ms cubic-bezier(0.16, 1, 0.3, 1) ${({ $index }) => `${Math.min($index * 140, 560)}ms`},
    scale 1050ms cubic-bezier(0.16, 1, 0.3, 1) ${({ $index }) => `${Math.min($index * 140, 560)}ms`},
    filter 900ms ease ${({ $index }) => `${Math.min($index * 140, 560)}ms`},
    transform 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;

  &[data-case-tier="featured"] {
    grid-column: 1 / -1;
    min-height: 0;
    padding: clamp(30px, 4.5vw, 58px);
    border-color: rgba(179, 201, 135, 0.32);
    background: #080907;
  }

  &[data-case-tier="featured"] h3 {
    font-size: clamp(38px, 5vw, 66px);
  }

  &[data-case-tier="featured"][data-language="ru"] h3 {
    font-size: clamp(34px, 4.5vw, 60px);
  }

  @media (min-width: 1200px) {
    &[data-case-tier="featured"] .featured-main {
      display: grid;
      grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);
      column-gap: clamp(32px, 5vw, 76px);
      row-gap: 0;
    }

    &[data-case-tier="featured"] .card-meta-line {
      grid-column: 1 / -1;
      grid-row: 1;
      justify-content: flex-start;
      margin: 0 0 20px;
    }

    &[data-case-tier="featured"] .featured-copy {
      grid-column: 1;
      grid-row: 2;
    }

    &[data-case-tier="featured"] [data-experience-metrics] {
      grid-column: 2;
      grid-row: 2;
      align-self: end;
      width: 100%;
      max-width: none;
      margin: 0 0 12px;
    }

    &[data-case-tier="featured"] .featured-tags,
    &[data-case-tier="featured"] .featured-action {
      grid-column: 1 / -1;
    }

    &[data-case-tier="featured"] .featured-action {
      justify-self: start;
      width: fit-content;
    }
  }

  &[data-case-tier="secondary"] {
    grid-column: 2 / span 10;
    min-height: 0;
    padding: clamp(28px, 3.8vw, 48px);
  }

  &[data-case-tier="secondary"] h3 {
    font-size: clamp(34px, 4.2vw, 54px);
  }

  &[data-case-tier="compact"] {
    min-height: 190px;
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;
    padding: clamp(20px, 2.5vw, 30px);
  }

  &[data-case-tier="compact"] h3 {
    font-size: clamp(28px, 3vw, 38px);
  }

  &.visible2 {
    opacity: 1;
    translate: 0 0;
    rotate: 0deg;
    scale: 1;
    filter: blur(0) saturate(1);
    animation: ${cardWave} 6s ease-in-out ${({ $index }) => 1200 + $index * 180}ms infinite;
  }

  &::before {
    content: "";
    position: absolute;
    top: clamp(16px, 1.5vw, 20px);
    bottom: clamp(16px, 1.5vw, 20px);
    left: 1px;
    width: 2px;
    border-radius: 999px;
    background: var(--highlited-text);
    opacity: 0.35;
    transform: scaleY(0.42);
    transform-origin: center;
    transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover,
  &:focus-visible {
    transition: border-color 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
    border-color: rgba(179, 201, 135, 0.62);
    background: #080907;
    transform: translateY(-4px) rotate(${({ $index }) => ($index % 2 === 0 ? "-1deg" : "1deg")});
    outline: none;
  }

  &:hover::before,
  &:focus-visible::before {
    opacity: 1;
    transform: scaleY(1);
  }

  @media (max-width: 900px) {
    grid-column: auto;

    &[data-case-tier="featured"],
    &[data-case-tier="secondary"],
    &[data-case-tier="compact"] {
      grid-column: auto;
    }
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    min-height: 0;
    gap: 16px;
    padding: 24px 22px;
    background: #080907;
    border-color: rgba(255, 255, 255, 0.12);

    &:hover,
    &:focus-visible {
      background: #080907;
      border-color: rgba(179, 201, 135, 0.34);
      transform: none;
    }

    &:hover::before,
    &:focus-visible::before {
      opacity: 0.35;
      transform: scaleY(0.42);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
    opacity: 1;
    translate: 0 0;
    rotate: 0deg;
    scale: 1;
    filter: none;

    &:hover,
    &:focus-visible {
      transform: none;
    }
  }
`;

const DugaConnector = styled.img<{ $index: number }>`
  display: none;

  @media (min-width: 901px) {
    position: absolute;
    top: 50%;
    z-index: -1;
    width: clamp(300px, 34vw, 420px);
    height: auto;
    opacity: 0.82;
    pointer-events: none;
    user-select: none;

    ${({ $index }) => $index % 2 === 0 ? `
      left: 100%;
      right: auto;
      translate: -4% -83%;
      rotate: 50deg;
      scale: 1 1;
      transform-origin: 4% 83%;
    ` : `
      right: 100%;
      left: auto;
      translate: 4% -83%;
      transform: rotate(-50deg) scaleX(-1);
      transform-origin: 96% 83%;
    `}
  }
`;

const CardMetaLine = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const CardPeriod = styled.span`
  color: var(--text);
  font-size: ${fluidText(13, 11)};
  font-weight: 500;
  line-height: 1.2;
  opacity: 0.68;
  text-transform: uppercase;
`;

const CardMetaDivider = styled.span`
  width: 1px;
  height: 12px;
  flex: 0 0 1px;
  background: rgba(255, 255, 255, 0.28);
`;

const CardDuration = styled.span`
  color: var(--highlited-text);
  font-size: ${fluidText(13, 11)};
  font-weight: 600;
  line-height: 1.2;
  opacity: 0.78;
`;

const CardMain = styled.div`
  position: relative;
  z-index: 2;
  min-width: 0;
`;

const CardCopy = styled.div`
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

const ScaleMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(100%, 780px);
  margin-top: clamp(26px, 3.4vw, 40px);
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
`;

const ScaleMetric = styled.div`
  min-width: 0;
  padding: 0 clamp(10px, 2.1vw, 28px);
  border-right: 1px solid rgba(255, 255, 255, 0.12);

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
    border-right: 0;
  }
`;

const MetricValue = styled.span`
  display: block;
  color: var(--highlited-text);
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.06em;
  line-height: 0.95;
`;

const MetricLabel = styled.span`
  display: block;
  max-width: 150px;
  margin-top: 9px;
  color: var(--text);
  font-size: clamp(9px, 1vw, 11px);
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1.35;
  opacity: 0.58;
  text-transform: uppercase;
`;

const CaseSignals = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 22px;
`;

const CaseSignal = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.09em;
  line-height: 1.3;
  opacity: 0.6;
  text-transform: uppercase;

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: var(--highlited-text);
  }
`;

const ContactBridge = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(24px, 4vw, 54px);
  max-width: 1080px;
  margin: clamp(28px, 4vw, 48px) auto 0;
  padding: clamp(26px, 3.8vw, 46px);
  border: 1px solid rgba(179, 201, 135, 0.28);
  border-radius: clamp(14px, 1.5vw, 20px);
  background: #080907;
  overflow: hidden;
  opacity: 0;
  translate: 0 36px;
  transition:
    opacity 850ms cubic-bezier(0.16, 1, 0.3, 1),
    translate 950ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 350ms ease;

  &::before {
    content: "";
    position: absolute;
    inset: 18px auto 18px 0;
    width: 2px;
    background: var(--highlited-text);
    opacity: 0.8;
  }

  &.visible2 {
    opacity: 1;
    translate: 0 0;
  }

  @media (hover: hover) {
    &:hover {
      border-color: rgba(179, 201, 135, 0.55);
    }
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 28px;
    padding: 24px 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    translate: 0 0;
    transition: none;
  }
`;

const ContactBridgeCopy = styled.div`
  position: relative;
  z-index: 1;
`;

const ContactBridgeEyebrow = styled.p`
  margin-bottom: 10px;
  color: var(--highlited-text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const ContactBridgeTitle = styled.h3`
  max-width: 700px;
  color: var(--text);
  font-size: clamp(32px, 4vw, 56px);
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 0.98;
  text-transform: uppercase;
`;

const ContactBridgeText = styled.p`
  max-width: 720px;
  margin-top: 14px;
  color: var(--text);
  font-size: ${fluidText(16, 14)};
  line-height: 1.5;
  opacity: 0.68;
`;

const ContactBridgeLink = styled.a`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-width: 196px;
  padding: 14px 16px;
  border: 1px solid rgba(179, 201, 135, 0.55);
  border-radius: 8px;
  color: var(--highlited-text);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    color 250ms ease,
    background-color 250ms ease,
    border-color 250ms ease,
    transform 250ms ease;

  span:last-child {
    font-size: 22px;
    line-height: 0.7;
    transition: transform 250ms ease;
  }

  &:hover,
  &:focus-visible {
    border-color: var(--highlited-text);
    background: var(--highlited-text);
    color: #080907;
    transform: translateY(-2px);
    outline: none;
  }

  &:hover span:last-child,
  &:focus-visible span:last-child {
    transform: translate(3px, -3px);
  }

  @media (max-width: 700px) {
    width: fit-content;
    min-width: min(100%, 196px);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
`;

const CardAction = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin-top: 22px;
  padding: 7px 11px;
  border: 1px solid rgba(179, 201, 135, 0.38);
  border-radius: 999px;
  color: var(--highlited-text);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  text-transform: uppercase;
  transition: background-color 0.25s ease, border-color 0.25s ease;

  ${ExperienceCard}:hover &, ${ExperienceCard}:focus-visible & {
    background-color: rgba(179, 201, 135, 0.1);
    border-color: rgba(179, 201, 135, 0.72);
  }
`;

const CardActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 20px;
  height: 20px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    stroke-width: 1.8;
  }

  .tap-icon {
    display: none;
  }

  @media (max-width: 768px) {
    .click-icon {
      display: none;
    }

    .tap-icon {
      display: block;
    }
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
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

const TechIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 15px;
  height: 15px;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const TechnologyTag = ({ name }: { name: string }) => (
  <Tag>
    <TechIcon aria-hidden="true">{getTechnologyIcon(name)}</TechIcon>
    <span>{name}</span>
  </Tag>
);

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1200;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.86);
  backdrop-filter: blur(12px);
  overflow: hidden;
`;

const ModalContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  padding: 28px;
  color: var(--text);
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

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

  > div {
    min-width: 0;
  }

  @media (max-width: 520px) {
    position: relative;
    padding-right: 58px;
  }
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
  overflow-wrap: anywhere;
  word-break: normal;
  hyphens: auto;

  @media (max-width: 520px) {
    font-size: clamp(2rem, 10vw, 2.5rem);
  }
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

  @media (max-width: 520px) {
    position: absolute;
    top: 0;
    right: 0;
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
  > span {
    display: block;
    color: var(--highlited-text);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  p {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0 7px;
    color: var(--text);
    font-size: ${fluidText(20, 16)};
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
  }

  p span {
    color: var(--highlited-text);
    font-size: 0.72em;
    font-weight: 600;
    opacity: 0.78;
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
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Experience() {
  const { language } = useLanguage();
  const experiences = language === "en" ? experiencesEn : experiencesRu;
  const sectionRef = useRef<HTMLElement>(null);
  const idCardAnchorRef = useRef<HTMLDivElement>(null);
  const idCardRef = useRef<HTMLImageElement>(null);
  const activeExperienceIndexRef = useRef(-1);
  const [reverseMarquee, setReverseMarquee] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const marqueeText = "WORK EXPERIENCE ";

  useEffect(() => {
    const revealSection = revealOnScroll(sectionRef.current, [
      { selector: ".experience-hidden", visibleClass: "visible2" },
    ]);

    const revealIdCard = revealOnScroll(document, [
      { selector: "[data-id-card]", visibleClass: "visible2" },
    ]);

    return () => {
      revealSection();
      revealIdCard();
    };
  }, [language]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [language]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const anchor = idCardAnchorRef.current;
    const idCard = idCardRef.current;
    if (!section || !anchor || !idCard) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-experience-card]"));
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    let isDesktop = desktopQuery.matches;
    let isActive = true;
    let triggers: ScrollTrigger[] = [];

    const setPosition = (
      left: number,
      top: number,
      rotation: number,
      animate: boolean
    ) => {
      gsap.killTweensOf(idCard);
      const position = { left, top, rotation, scale: 1 };

      if (animate) {
        gsap.to(idCard, {
          ...position,
          duration: 0.48,
          ease: "power3.out",
          overwrite: "auto",
        });
      } else {
        gsap.set(idCard, position);
      }
    };

    const positionAtAnchor = (animate = false) => {
      activeExperienceIndexRef.current = -1;
      const rect = anchor.getBoundingClientRect();
      setPosition(rect.left + window.scrollX, rect.top + window.scrollY, 0, animate);
    };

    const positionAtCard = (index: number, animate: boolean) => {
      const card = cards[index];
      if (!card) return;

      activeExperienceIndexRef.current = index;
      const rect = card.getBoundingClientRect();
      const imageWidth = idCard.getBoundingClientRect().width;
      const left = index % 2 === 0
        ? rect.right + window.scrollX - imageWidth * 0.42
        : rect.left + window.scrollX - imageWidth * 0.58;
      const top = rect.top + window.scrollY + Math.min(34, rect.height * 0.12);

      setPosition(left, top, index % 2 === 0 ? 18 : 0, animate);
    };

    const moveToCard = (index: number) => {
      if (index === activeExperienceIndexRef.current) return;
      positionAtCard(index, true);
    };

    const createTriggers = () => {
      triggers.forEach((trigger) => trigger.kill());
      triggers = [];

      isDesktop = desktopQuery.matches;
      if (!isDesktop) {
        positionAtAnchor();
        return;
      }

      const activeIndex = activeExperienceIndexRef.current;
      if (activeIndex >= 0 && cards[activeIndex]) {
        positionAtCard(activeIndex, true);
      } else {
        positionAtAnchor();
      }

      cards.forEach((card, index) => {
        triggers.push(ScrollTrigger.create({
          trigger: card,
          start: "center 72%",
          onEnter: () => moveToCard(index),
          onEnterBack: () => moveToCard(index),
          onLeaveBack: index === 0 ? () => positionAtAnchor(true) : undefined,
        }));
      });
    };

    const syncCurrentPosition = () => {
      if (!isActive) return;
      const activeIndex = activeExperienceIndexRef.current;
      if (isDesktop && activeIndex >= 0 && cards[activeIndex]) {
        positionAtCard(activeIndex, false);
      } else {
        positionAtAnchor();
      }
    };

    createTriggers();

    const resizeObserver = new ResizeObserver(syncCurrentPosition);
    resizeObserver.observe(anchor);
    if (anchor.parentElement) {
      resizeObserver.observe(anchor.parentElement);
      const title = anchor.parentElement.firstElementChild;
      if (title) resizeObserver.observe(title);
    }
    cards.forEach((card) => resizeObserver.observe(card));

    void document.fonts?.ready.then(syncCurrentPosition);

    const handleResize = () => {
      if (desktopQuery.matches !== isDesktop) {
        createTriggers();
      } else {
        syncCurrentPosition();
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isActive = false;
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(idCard);
    };
  }, [language]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const responsiveAnimations = gsap.matchMedia();

    responsiveAnimations.add(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
      () => {
        const featuredCard = section.querySelector<HTMLElement>('[data-case-tier="featured"]');
        const metricNodes = Array.from(
          section.querySelectorAll<HTMLElement>("[data-experience-counter]")
        );
        if (!featuredCard || metricNodes.length === 0) return;

        const counters = metricNodes.map((node) => ({
          node,
          target: Number(node.dataset.counterEnd),
          value: { count: 0 },
        }));
        counters.forEach(({ node }) => {
          node.textContent = "0";
        });

        const countUp = gsap.timeline({ paused: true });
        counters.forEach(({ node, target, value }, index) => {
          const startAt = index * 0.12;
          countUp.fromTo(
            node,
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.48, ease: "power2.out" },
            startAt
          );
          countUp.to(
            value,
            {
              count: target,
              duration: 0.92,
              ease: "power2.out",
              snap: { count: 1 },
              onUpdate: () => {
                node.textContent = String(Math.round(value.count));
              },
            },
            startAt
          );
        });

        const metricsBlock = featuredCard.querySelector<HTMLElement>("[data-experience-metrics]");
        if (!metricsBlock) return;

        ScrollTrigger.create({
          trigger: metricsBlock,
          start: "top bottom-=80px",
          once: true,
          onEnter: () => countUp.play(0),
        });

        return () => {
          counters.forEach(({ node, target }) => {
            node.textContent = String(target);
          });
        };
      },
      section
    );

    return () => responsiveAnimations.revert();
  }, []);

  useEffect(() => {
    setSelectedExperience(null);
  }, [language]);

  useEffect(() => {
    if (selectedExperience) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
      stopSmoothScroll();
    } else {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      startSmoothScroll();
    }

    return () => {
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
      startSmoothScroll();
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
          data-marquee-parallax
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
            <Title className="experience-hidden">EXPERIENCE</Title>
            <IdCardAnchor
              ref={idCardAnchorRef}
              data-id-card-anchor
              aria-hidden="true"
            />
          </HeaderRow>

          <ExperienceList>
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                $index={index}
                className="experience-hidden"
                data-experience-card
                data-language={language}
                data-case-tier={
                  index === 0 ? "featured" : index === 1 ? "secondary" : "compact"
                }
                type="button"
                onClick={() => setSelectedExperience(experience)}
              >
                <CardMain className={index === 0 ? "featured-main" : undefined}>
                  <CardMetaLine className="card-meta-line">
                    <CardPeriod>{experience.period}</CardPeriod>
                    <CardMetaDivider aria-hidden="true" />
                    <CardDuration>
                      {formatExperienceDuration(experience.durationMonths, language)}
                    </CardDuration>
                  </CardMetaLine>
                  <CardCopy className={index === 0 ? "featured-copy" : undefined}>
                    <Company>{experience.company}</Company>
                    <Role>{experience.role}</Role>
                    <Summary>{experience.summary}</Summary>
                  </CardCopy>
                  {index === 0 && (
                    <ScaleMetrics
                      data-experience-metrics
                      aria-label={language === "en" ? "Platform scale" : "Масштаб платформы"}
                    >
                      {(language === "en"
                        ? [
                            { value: 42, label: "domain modules" },
                            { value: 89, label: "database entities" },
                            { value: 155, label: "database migrations" },
                          ]
                        : [
                            { value: 42, label: "доменных модуля" },
                            { value: 89, label: "сущностей базы данных" },
                            { value: 155, label: "миграций базы данных" },
                          ]
                      ).map((metric) => (
                        <ScaleMetric key={metric.label}>
                          <MetricValue data-experience-counter data-counter-end={metric.value}>
                            {metric.value}
                          </MetricValue>
                          <MetricLabel>{metric.label}</MetricLabel>
                        </ScaleMetric>
                      ))}
                    </ScaleMetrics>
                  )}
                  {index === 1 && (
                    <CaseSignals aria-label={language === "en" ? "CN-IRK case focus" : "Фокус кейса CN-IRK"}>
                      {(language === "en"
                        ? ["Customer order flow", "Operations workspace", "Two-way Notion sync"]
                        : ["Путь заказа клиента", "Рабочее место команды", "Двусторонняя синхронизация с Notion"]
                      ).map((signal) => <CaseSignal key={signal}>{signal}</CaseSignal>)}
                    </CaseSignals>
                  )}
                  <Tags className={index === 0 ? "featured-tags" : undefined}>
                    {getCardTechnologies(experience, index).map((item) => (
                      <TechnologyTag key={item} name={item} />
                    ))}
                  </Tags>
                  <CardAction className={index === 0 ? "featured-action" : undefined}>
                    {language === "en" ? "View details" : "Подробнее"}
                    <CardActionIcon aria-hidden="true">
                      <TbClick className="click-icon" />
                      <TbHandClick className="tap-icon" />
                    </CardActionIcon>
                  </CardAction>
                </CardMain>
                {index < experiences.length - 1 && (
                  <DugaConnector src={dugaSrc} alt="" aria-hidden="true" $index={index} />
                )}
              </ExperienceCard>
            ))}
          </ExperienceList>

          <ContactBridge className="experience-hidden">
            <ContactBridgeCopy>
              <ContactBridgeEyebrow>
                {language === "en" ? "NEXT CHALLENGE" : "СЛЕДУЮЩАЯ ЗАДАЧА"}
              </ContactBridgeEyebrow>
              <ContactBridgeTitle>
                {language === "en" ? "Your idea" : "Ваша идея"}
              </ContactBridgeTitle>
              <ContactBridgeText>
                {language === "en"
                  ? "I'll build it from interface and backend to integrations and production."
                  : "Реализую её целиком: от интерфейса и backend до интеграций и запуска в production."}
              </ContactBridgeText>
            </ContactBridgeCopy>
            <ContactBridgeLink
              href="#contacts"
              onClick={(event) => {
                event.preventDefault();
                const contactsSection = document.getElementById("contacts");
                if (contactsSection) scrollToElement(contactsSection, 240);
              }}
            >
              <span>{language === "en" ? "Let's talk" : "Обсудить идею"}</span>
              <span aria-hidden="true">↗</span>
            </ContactBridgeLink>
          </ContactBridge>
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
              data-lenis-prevent
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
                    <p>
                      {selectedExperience.period}
                      <span>
                        · {formatExperienceDuration(selectedExperience.durationMonths, language)}
                      </span>
                    </p>
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
                            <TechnologyTag key={item} name={item} />
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
                              <TechnologyTag key={item} name={item} />
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
      {typeof document !== "undefined" && createPortal(
        <IdCardDecoration
          ref={idCardRef}
          className="experience-hidden"
          data-id-card
          src={idCardSrc}
          alt=""
          aria-hidden="true"
          initial={false}
        />,
        document.body
      )}
    </>
  );
}
