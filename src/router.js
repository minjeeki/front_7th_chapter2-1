class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.notFoundHandler = null;
  }

  // 라우트 등록
  addRoute(path, handler) {
    const route = {
      path,
      handler,
      regex: this.pathToRegex(path),
      keys: [],
    };
    this.routes.push(route);
  }

  // 경로를 정규식으로 변환
  pathToRegex(path) {
    const keys = [];
    const pattern = path
      .replace(/\//g, "\\/")
      .replace(/:(\w+)/g, (match, key) => {
        keys.push(key);
        return "([^/]+)";
      })
      .replace(/\*/g, ".*");

    return {
      regex: new RegExp(`^${pattern}$`),
      keys,
    };
  }

  // 경로 매칭
  matchRoute(pathname) {
    for (const route of this.routes) {
      const match = pathname.match(route.regex.regex);
      if (match) {
        const params = {};
        route.regex.keys.forEach((key, index) => {
          params[key] = match[index + 1];
        });

        return {
          route,
          params,
        };
      }
    }
    return null;
  }

  // 404 처리
  setNotFoundHandler(handler) {
    this.notFoundHandler = handler;
  }

  // URL 파싱
  parseURL(url) {
    const urlObj = new URL(url, window.location.origin);
    const params = {};
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return {
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      params,
      query: params,
    };
  }

  // 네비게이션 처리
  navigate(url, replace = false) {
    const parsed = this.parseURL(url);
    const matched = this.matchRoute(parsed.pathname);
    this.executeRoute({ to: parsed, matched }, replace);
  }

  // 라우트 실행
  executeRoute(navigation, replace = false) {
    const { to, matched } = navigation;

    if (matched) {
      const { route, params } = matched;
      this.currentRoute = {
        pathname: to.pathname,
        params,
        query: to.query,
      };

      // History API로 URL 업데이트
      const url = to.pathname + to.search + to.hash;
      if (replace) {
        window.history.replaceState({ path: url }, "", url);
      } else {
        window.history.pushState({ path: url }, "", url);
      }

      // 라우트 핸들러 실행
      route.handler({
        params,
        query: to.query,
        pathname: to.pathname,
        search: to.search,
      });
    } else if (this.notFoundHandler) {
      // 404 핸들러 실행
      this.currentRoute = {
        pathname: to.pathname,
        params: {},
        query: to.query,
      };
      const url = to.pathname + to.search + to.hash;
      if (replace) {
        window.history.replaceState({ path: url }, "", url);
      } else {
        window.history.pushState({ path: url }, "", url);
      }
      this.notFoundHandler({
        pathname: to.pathname,
        query: to.query,
      });
    }
  }

  // 라우터 초기화
  init() {
    // 초기 경로 처리
    const initialURL = window.location.pathname + window.location.search + window.location.hash;
    this.navigate(initialURL, true);

    // popstate 이벤트 리스너 (뒤로가기/앞으로가기)
    window.addEventListener("popstate", (event) => {
      const url = event.state?.path || window.location.pathname + window.location.search + window.location.hash;
      this.navigate(url, true);
    });

    // 링크 클릭 이벤트 위임 (data-link 속성을 가진 링크)
    document.addEventListener("click", (event) => {
      const target = event.target.closest("[data-link]");
      if (target && target.tagName === "A") {
        event.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          this.navigate(href);
        }
      }
    });
  }

  // URL 쿼리 파라미터를 문자열로 변환
  buildQueryString(query) {
    const params = new URLSearchParams();
    Object.keys(query).forEach((key) => {
      if (query[key] !== null && query[key] !== undefined && query[key] !== "") {
        params.append(key, query[key]);
      }
    });
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }

  // 현재 경로를 유지하면서 쿼리 파라미터만 업데이트
  updateQuery(query, replace = true) {
    const currentPath = this.currentRoute?.pathname || window.location.pathname;
    const queryString = this.buildQueryString(query);
    const url = currentPath + queryString;
    this.navigate(url, replace);
  }
}

// 싱글톤 인스턴스 생성
export const router = new Router();
