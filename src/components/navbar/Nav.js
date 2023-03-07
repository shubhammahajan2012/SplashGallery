import { Navbar, Text, Input } from "@nextui-org/react";
import { Layout } from "../navbar/Layout";
//Navbar Logos
import { SplashGallery } from "../navbar/SplashGallery";
import { SearchIcon } from "../navbar/SearchIcon";
//Styles
import "../../styles/styles.css";
import { Button } from "@nextui-org/react";
//Hooks
import { useState } from "react";
import { ImageCard } from "../card/ImageCard";
//Dark Theme & Icons
import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";
import { MoonIcon } from "../icon/MoonIcon";
import { SunIcon } from "../icon/SunIcon";

export default function Nav(props) {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(false);

  //Dark Theme
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  const fetchData = () => {
    fetch(
      `https://api.unsplash.com/search/photos?client_id=dhOhmGjRKxx6aCYzyOjAe_thzB-PMAGbVVE0Nxu3WF0&query=${value}&per_page=30`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSearchResult(data.results);
        setShowResults(true);
        props.onSearch(data.results, true);
      });
  };

  let imageCards = searchResult?.map((item, index) => {
    return (
      <ImageCard
        key={item.id}
        src={item.urls.regular}
        userName={item.user.name}
        likes={item.likes}
        avatar={item.user.profile_image.medium}
      />
    );
  });

  return (
    <Layout>
      <Navbar isBordered variant="floating">
        <a style={{ color: "inherit" }} href="/">
          <Navbar.Brand css={{ mr: "$4" }}>
            <SplashGallery />
            <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
              SplashGallery
            </Text>
          </Navbar.Brand>
        </a>
        <Navbar.Content>
          <Navbar.Item>
            <Input
              clearable
              contentLeft={
                <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
              }
              contentLeftStyling={false}
              css={{
                w: "100%",
                "@xsMax": {
                  mw: "300px"
                },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center"
                }
              }}
              placeholder="Search..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Navbar.Item>
          <Button color="gradient" auto onPress={fetchData}>
            Find
          </Button>
        </Navbar.Content>

        <Switch
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          size="lg"
          iconOn={<SunIcon filled />}
          iconOff={<MoonIcon filled />}
        />
      </Navbar>
      <div className="grid grid-cols-3 gap-4 p-4">
        {showResults && imageCards}
      </div>
    </Layout>
  );
}
