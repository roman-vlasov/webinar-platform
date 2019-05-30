// import ProgressStatusEnum from 'Enumerations/progress-status'
// import CourseModuleBlockType from 'Enumerations/course-module-block-type'
//
// function convertCourseModuleCardProps(courseModule) {
//     return {
//         id: courseModule.number,
//         number: courseModule.number,
//         name: courseModule.name,
//         description: courseModule.description,
//         state: courseModule.state,
//         image: courseModule.cardStyle.image,
//         textColor: courseModule.cardStyle.textColor,
//         stepperBackgroundColor: courseModule.cardStyle.stepperBackgroundColor,
//         stepperCompletedColor: courseModule.cardStyle.stepperCompletedColor,
//         stepperActiveColor: courseModule.cardStyle.stepperActiveColor,
//         levelsCount: courseModule.levelsCount,
//         currentLevel: Number(courseModule.currentBlockNumber)
//     }
// }
//
// function convertCourseModuleProps(courseModule) {
//     return {
//         id: courseModule.number,
//         number: courseModule.number,
//         name: courseModule.name,
//         description: courseModule.description,
//         state: courseModule.state,
//         image: courseModule.pageStyle.image,
//         textColor: courseModule.pageStyle.textColor,
//         currentLevel: Number(courseModule.currentBlockNumber)
//     }
// }
//
// function convertCourseModuleBlockCardProps(courseModuleBlock) {
//     return {
//         id: courseModuleBlock.number,
//         number: courseModuleBlock.number,
//         numberTitle: courseModuleBlock.number.toString(),
//         // Если имя отсутствует, то выводим тип блока
//         nameTitle: courseModuleBlock.name ||
//                    (courseModuleBlock.blockType === CourseModuleBlockType.THEORY ? 'Теория' : 'Практика'),
//         blockType: courseModuleBlock.blockType,
//         state: courseModuleBlock.state,
//         blocked: courseModuleBlock.state === ProgressStatusEnum.CLOSED,
//         result: courseModuleBlock.result,
//         scoreStars: courseModuleBlock.blockType === CourseModuleBlockType.THEORY
//                     ? null
//                     : Math.round((courseModuleBlock.result || 0) / 100 * 3),
//         totalStars: 3
//     }
// }
//
// function convertCourseModuleBlockProps(courseModuleBlock) {
//     return {
//         id: courseModuleBlock.number,
//         number: courseModuleBlock.number,
//         name: courseModuleBlock.block.name,
//         blockType: courseModuleBlock.blockType,
//         state: courseModuleBlock.state,
//         result: courseModuleBlock.result
//     }
// }
//
// function convertTheoryProps(theory) {
//     return {
//         id: theory.id,
//         name: theory.name,
//         /* Сортируем TheoryUnit в соответствии с последовательностью contentId из массива unitsOrder */
//         theoryUnits: theory.unitsOrder.map(function(item) {
//             return theory.theoryUnits.find(function(el) {
//                 return el.contentId === item
//             })
//         }),
//         contentId: theory.contentId
//     }
// }
//
// export {
//     convertCourseModuleCardProps,
//     convertCourseModuleProps,
//     convertCourseModuleBlockCardProps,
//     convertCourseModuleBlockProps,
//     convertTheoryProps
// }
