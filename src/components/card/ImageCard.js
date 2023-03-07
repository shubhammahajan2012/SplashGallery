//NextUI Library
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { Modal, Image, Link } from "@nextui-org/react";
import { HeartIcon } from "../icon/HeartIcon";
import { User } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";
//Hooks
import { useState } from "react";

export const ImageCard = (props) => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <div onClick={handler}>
      <Grid.Container gap={8} justify="space-between">
        <Grid md={4}>
          <Col>
            <Card css={{ w: "400px", h: "350px" }}>
              <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col></Col>
              </Card.Header>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={props.src}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  alt="Card example background"
                />
              </Card.Body>
              <Card.Footer
                isBlurred
                css={{
                  position: "absolute",
                  bgBlur: "#ffffff66",
                  borderTop:
                    "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                  bottom: 0,
                  zIndex: 1
                }}
              >
                <Row>
                  <Row justify="flex-start">
                    <User src={props.avatar} name={props.userName}></User>
                  </Row>

                  <Col>
                    <Row justify="flex-end">
                      <Button
                        auto
                        color="error"
                        icon={<HeartIcon fill="currentColor" filled />}
                      />
                    </Row>
                  </Col>
                </Row>
                <Text className="like-text" color="#000" size={12}>
                  {props.likes}
                </Text>
              </Card.Footer>
            </Card>
            <Modal
              noPadding
              open={visible}
              onClose={closeHandler}
              width="600px"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <Modal.Header
                css={{
                  position: "absolute",
                  zIndex: "$1",
                  top: 5,
                  right: 8
                }}
                id="modal-title"
              >
                <Text color="#363449">
                  Photo by{" "}
                  <Link
                    color
                    rel="noopener noreferrer"
                    target="_blank"
                    href={props.userName}
                  >
                    {props.userName}
                  </Link>{" "}
                  on{" "}
                  <Link
                    rel="noopener noreferrer"
                    target="_blank"
                    href="https://unsplash.com/s/visual/ef7937f3-0d44-43eb-b992-28050748f999?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  >
                    Unsplash
                  </Link>
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Image showSkeleton src={props.src} width={1000} height={590} />
              </Modal.Body>
              <Modal.Footer>
                <Row justify="flext-start">
                  {" "}
                  <Button.Group color="gradient" ghost>
                    <Button>Likes: {props.likes}</Button>
                  </Button.Group>
                </Row>
              </Modal.Footer>
            </Modal>
          </Col>
        </Grid>
      </Grid.Container>
    </div>
  );
};
