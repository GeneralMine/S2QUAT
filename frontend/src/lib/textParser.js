export function parseEnumToEmoji(str) {
    // ActionStatus
    if (str === 'SUCCESS') return '✅';
    if (str === 'ERROR') return '❌';
    if (str === 'RUNNING') return '⏳';
    // UserRole
    if (str === 'USER') return '🧍';
    if (str === 'EDITOR') return '👷';
    if (str === 'ADMIN') return '🧙';
    // UserStatus
    if (str === 'ACTIVE') return '🏃';
    if (str === 'DEACTIVATED') return '🔒';
    if (str === 'NOT_VERIFIED') return '🔐';
    // ProjectStatus
    if (str === 'INACTIVE') return '🔒';
    if (str === 'ARCHIVED') return '🗄️';
    // TestPersonSex
    if (str === 'FEMALE') return '♀️';
    if (str === 'MALE') return '♂️';
    if (str === 'NON_BINARY') return '⚧️';
    // QuestionType
    if (str === 'SCORE') return '🔢';
    if (str === 'TEXT') return '🔢📝';
    if (str === 'SCORE_TEXT') return '📝';
    if (str === 'BOOLEAN') return '0️⃣1️⃣';
    if (str === 'CHECKBOX') return '☑️';
    if (str === 'RADIOBUTTON') return '🔘';
    return str;
}