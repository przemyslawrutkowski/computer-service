# Aplikacja w technologii React
## Punktacja elementów technicznych (15pkt):
- własna walidacja danych wprowadzanych przez użytkownika ( w każdym przypadku wprowadzania danych, co najmniej 5 różnych przypadków danych) - 2pkt,
- użycie TypeScript, ew. obowiązkowa weryfikacja typu danych (PropTypes) przekazywanych do wszystkich komponentów (nie stosujemy typu 'any') - 2pkt
- wykorzystanie komponentów prezentacyjnych (co najmniej 2 przypadki) - 1pkt,
- dwukierunkowa komunikacja pomiędzy komponentami  - 1pkt,
- co najmniej 4 komponenty reużywalne (komponenty, które mogą być użyte bez zmian w kodzie komponentu w innym miejscu projektu) - 2pkt
- odyfikacja danych odbywa się tylko w jednym komponencie - 1pkt
- operacje modyfikacji danych za pomocą 4 rodzajów żądań http - 2pkt
- żądania do serwera są zapisane w jednym oddzielnym pliku (serwis) - 1pkt
- routing (ścieżki 'routes', w tym jedna z parametrem) - 1pkt
- wykorzystanie dwóch zmiennych właściwości routingu (np. navigate, params) - 1pkt
- architektura Flux - 3pkt (nieobowiązkowa i niepunktowana w roku 2023/2024)
- brak błędów/ostrzeżeń w konsoli przegladarki - 1pkt

W sumie za projekt można uzyskać 20 23pkt (185pkt za implementację+1pkt za prezentację aplikacji i 1 pkt za estetyczny wygląd, 3 pkt za prezentację postępów zgodność z wymaganiami dostępności: struktura, kontrast,kolejność, atrybuty HTML, itp. - co najmniej 14 punktów w Kwestionariuszu dostępności cyfrowej https://cez2.wi.pb.edu.pl/moodle/mod/quiz/view.php?id=53594).

## Dokumentacja projektu:
a) architektura komponentów, przekazywane właściwości i metody
b) ścieżki i komponenty związane z routigniem
c) [dane w store+które komponenty korzystają]
d) API serwera
e) wybrane przez autorów, szczególnie ciekawe fragmenty kodu
f) wypunktowane elementy techniczne, które zostały zrealizowane w projekcie wraz z krótkim komentarzem odnośnie realizacji: jak zrealizowano i w którym pliku
g) [Dodatkowe biblioteki użyte w aplikacji: link oraz zdanie opisu biblioteki i celu użycia].
h) Podział pracy w zespole


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
