import React, { useRef, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { motion, useAnimation } from "framer-motion"

import { useOnScreen } from "../../hooks/"
import Context from "../../context/"
import ContentWrapper from "../../styles/contentWrapper"

const StyledSection = styled.section`
  width: 100%;
  height: auto;
  background: ${({ theme }) => theme.colors.background};
  margin-top: -5rem;
`

const StyledContentWrapper = styled(ContentWrapper)`
  && {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 15rem;
    flex-direction: column;
    justify-content: space-between;
    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: row;
      justify-content: space-between;
    }
    .section-title {
      margin-bottom: 2rem;
    }
    .inner-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-content {
      width: 100%;
      max-width: 31.25rem;
      font-size: 20px
    }
    .image-content {
      width: 100%;
      max-width: 18rem;
      margin-top: 4rem;
      margin-left: 0;
      @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 2rem;
      }
    }
    .about-author {
      border-radius: ${({ theme }) => theme.borderRadius};
      box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.16);
      filter: grayscale(20%) contrast(1) brightness(90%);
      transition: all 0.3s ease-out;
      &:hover {
        filter: grayscale(50%) contrast(1) brightness(90%);
        transform: translate3d(0px, -0.125rem, 0px);
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.32);
      }
    }
  }
`

const About = ({ content }) => {
  const { frontmatter, body } = content[0].node
  const { isIntroDone } = useContext(Context).state
  // const tControls = useAnimation()
  // const iControls = useAnimation()

  // // Required for animating the text content
  // const tRef = useRef()
  // const tOnScreen = useOnScreen(tRef)

  // // Required for animating the image
  // const iRef = useRef()
  // const iOnScreen = useOnScreen(iRef)

  const ref = useRef()
  const onScreen = useOnScreen(ref)
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Only trigger animations if the intro is done or disabled
  // useEffect(() => {
  //   if (isIntroDone) {
  //     if (tOnScreen) tControls.start({ opacity: 1, y: 20 })
  //     if (iOnScreen) iControls.start({ opacity: 1, x: 20 })
  //   }
  // }, [isIntroDone, tControls, iControls, tOnScreen, iOnScreen])

  return (
    <StyledSection id="about"
      ref={ref}
      variants={variants}
      animate={onScreen ? "visible" : "hidden"}
    >
      <StyledContentWrapper>
        <motion.div
          className="inner-wrapper"
        >
          <h2 className="section-title">{frontmatter.title}</h2>
          <div className="text-content">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </motion.div>
        <motion.div
          className="image-content"
        >
          <Img
            className="about-author"
            fluid={frontmatter.image.childImageSharp.fluid}
          />
        </motion.div>
      </StyledContentWrapper>
    </StyledSection>
  )
}

About.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        body: PropTypes.string.isRequired,
        frontmatter: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
}

export default About
