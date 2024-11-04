import React from 'react';
import { motion } from 'framer-motion';
import { useSlideInAnimation } from '../hooks/useSlideInAnimation';

function Scroll() {
  const animationSettings = useSlideInAnimation(); // hook에서 설정 가져오기

  return (
    <section className="scroll-section" id="about">
      <br/><br/><br/><br/><br/>

      <motion.div
        className="content-box"
        initial={animationSettings.initial}
        whileInView={animationSettings.whileInView}
        transition={animationSettings.transition}
        viewport={animationSettings.viewport}
      >
        <h2>ABOUT US</h2>
        <p>가천대학교 IT 중앙 동아리입니다.
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </p>
        <a href="about">더 보러가기</a>
      </motion.div>

      <motion.div
        className="content-box"
        initial={animationSettings.initial}
        whileInView={animationSettings.whileInView}
        transition={animationSettings.transition}
        viewport={animationSettings.viewport}
      >
        <h2>PROJECT</h2>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <a href="project">더 보러가기</a>
      </motion.div>

      <motion.div
        className="content-box"
        initial={animationSettings.initial}
        whileInView={animationSettings.whileInView}
        transition={animationSettings.transition}
        viewport={animationSettings.viewport}
      >
        <h2>FOR MEMBERS</h2>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <a href="members">더 보러가기</a>
      </motion.div>

      <motion.div
        className="content-box"
        initial={animationSettings.initial}
        whileInView={animationSettings.whileInView}
        transition={animationSettings.transition}
        viewport={animationSettings.viewport}
      >
        <h2>RECRUIT</h2>
        <a href = "recruit">신청하러 가기</a>
      </motion.div>
    </section>
  );
}

export default Scroll;
