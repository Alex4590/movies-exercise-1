import React from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, NavItem, Grid, Row, Col, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';

import { MOVIES } from './movies.js';

import './styles.css';

class Movies extends React.Component {

    constructor(props) {
        super(props);

        /**
         * Инициализиурем стейт компонента.
         */
        this.state = {
            format: null,               // Начальное состояние для фильтра 'Формат'.
            genre: null,                // Начальное состояние для фильтра 'Жанр'.
            year: null,                 // Начальное состояние для фильтра 'Год'.
            searchInput: null,          // Начальное состояние для фильтра 'Поиск по названию фильму'.
            result: MOVIES              // По умолчанию полжим сразу все фильмы. Их нужно будет показать в таблице.
        }

        /**
         * Делаем привязку контекста для обработчиков событий.
         * "Зашиваем" в методы ссылку на текущий объект, чтобы в теле метода this ссылался на объект.
         */
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    }

    /**
     * Обработчик изменения значения в фильтре 'Формат'.
     */
    handleFormatChange (selectedOption) {
        // Фильтруем по формату.
        const resultArray = MOVIES.filter(
            (item) => item.format.indexOf(selectedOption.value) !== -1
        );

        this.setState({
            format: selectedOption,
            result: resultArray
        });
    }

    /**
     * Обработчик изменения значения в фильтре 'Жанр'.
     */
    handleGenreChange (selectedOption) {
        // Фильтруем по жанрам. Не забываем при этом, что жанров может быть много, они лежат в массиве.
        // Это не сильно усложняет условие фильтрации, ведь indexOf метод прекрасно работает как со строкой так и с массивом.
        const resultArray = MOVIES.filter(
            (item) => item.genre_ids.indexOf(selectedOption.value) !== -1
        );

        this.setState({
            genre: selectedOption,
            result: resultArray
        });
    }

    /**
     * Обработчик изменения значения в фильтре 'Год'.
     */
    handleYearChange (selectedOption) {

        // Фильтруем по году.
        const resultArray = MOVIES.filter(
            (item) => item.release_date.indexOf(selectedOption.value) !== -1
        );

        this.setState({
            year: selectedOption,
            result: resultArray
        });
    }

    /**
     * Обработчик изменения значения в поле 'Название фильма для поиска'.
     */
    handleSearchInputChange (event) {
        this.setState({
            searchInput: event.target.value
        });
    }

    /**
     * Обработчик нажатия на кнопку 'Поиск'.
     */
    handleSearchButtonClick () {        
        // Для удобства выносим из стейта в отдельную переменную...
        // const searchInput = this.state.searchInput;

        // ...В ES6 появился специальный синтаксис: деструктуризация. Делаем тоже самое, что закоментированная строка выше.
        const { searchInput } = this.state;
        
        // Фильтруем справочник по условию вхождения введённого значения в название.
        // Обратите внимание, что перед сравнением мы преобразовываем оба значения к нижнему регистру.
        // Это делает поиск регистронезависимым.
        // Также обратите внимание, что если searchInput пустое, то мы кладём в стейт весь справочник (например, если юзер очистил поле и нажал 'Поиск').
        // Для этого используется тренарный оператор. В React он используется очень часто.
        const resultArray = searchInput ?
            MOVIES.filter(
                (item) => item.title.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
            ) : MOVIES;

        this.setState({
            result: resultArray
        });
    }

    render () {
        return (
            <div>
                {/* Шапка приложения. */}
                <Navbar inverse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            Search
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            My Movies
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            John Doe
                        </NavItem>
                    </Nav>
                </Navbar>

                {/* Основное содержимое. */}
                <Grid>
                    <Row className="show-grid">
                        <Col xs={3}>
                            <Select
                                name="format"
                                value={this.state.format}
                                onChange={this.handleFormatChange}
                                clearable={false}
                                options={[
                                    { value: 'movie', label: 'Фильм' },
                                    { value: 'tvseries', label: 'Сериал' },
                                ]}
                            />
                        </Col>
                        <Col xs={3}>
                            <Select
                                name="genre"
                                value={this.state.genre}
                                onChange={this.handleGenreChange}
                                clearable={false}
                                options={[
                                    { value: 12, label: 'Приключения' },
                                    { value: 16, label: 'Мультфильм' },
                                    { value: 35, label: 'Комедия' },
                                    { value: 53, label: 'Триллер' }
                                    // При желании можете добавить и остальные жанры...
                                    // 28	боевик
                                    // 12	приключения
                                    // 16	мультфильм
                                    // 35	комедия
                                    // 80	криминал
                                    // 99	документальный
                                    // 18	драма
                                    // 10751	семейный
                                    // 14	фэнтези
                                    // 36	история
                                    // 27	ужасы
                                    // 10402	музыка
                                    // 9648	детектив
                                    // 10749	мелодрама
                                    // 878	фантастика
                                    // 10770	телевизионный фильм
                                    // 53	триллер
                                    // 10752	военный
                                    // 37	вестерн
                                ]}
                            />
                        </Col>
                        <Col xs={3}>
                            <Select
                                name="year"
                                value={this.state.year}
                                onChange={this.handleYearChange}
                                clearable={false}
                                options={[
                                    { value: '2010', label: '2010' },
                                    { value: '2011', label: '2011' },
                                    { value: '2012', label: '2012' },
                                    { value: '2013', label: '2013' },
                                    { value: '2014', label: '2014' },
                                    { value: '2015', label: '2015' },
                                    { value: '2016', label: '2016' },
                                    { value: '2017', label: '2017' },
                                    { value: '2018', label: '2018' },
                                ]}
                            />
                        </Col>
                        <Col xs={3}>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl type="text" onChange={this.handleSearchInputChange} />
                                    <InputGroup.Button>
                                        <Button onClick={this.handleSearchButtonClick}>Search</Button>
                                    </InputGroup.Button>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </Grid>

                {
                  /* 
                   * TODO 1:
                   * Вместо нижестоящего куска кода необходимо реализовать таблицу согласно макету. 
                   * Не забудьте обернуть её в компонент Row. Как думаете сколько колонок нужно, чтобы отрисовать таблицу?
                   * (Правильный ответ: одна (т.е. xs={12})). 
                   * 
                   * TODO 2:
                   * В текущей реализации фильтрация не поддерживает применение нескольких фильтров сразу.
                   * Можно отфильтровать записи по году, или по жанру.
                   * Но нельзя применить оба фильтра одновременно.
                   * Реализуйте применение нескольких фильтров одновременно.
                   */
                }                
                {
                    this.state.result.map(
                        (item, index) => <div key={index}>{item.title}</div>
                    )
                }
            </div>
        )
    }
}

ReactDOM.render(
    <Movies />,
    document.getElementById("root")
);
