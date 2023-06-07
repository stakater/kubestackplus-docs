local_resource('install vale',
                cmd='which vale > /dev/null || brew install vale')
local_resource('spell check with vale',
                cmd='vale content',
                deps='./content/',
                resource_deps=['install vale'])

local_resource('install markdownlint',
                cmd='which markdownlint > /dev/null || brew install markdownlint-cli')
local_resource('markdownlint',
                cmd='markdownlint -c .markdownlint.yaml content',
                deps='./content/',
                resource_deps=['install markdownlint'])

local_resource('build test image',
               cmd='docker build -t test .',
               deps='./content/',
               resource_deps=['spell check with vale', 'markdownlint'])

local_resource('run test container',
               cmd='docker run -d -p 8080:8080 test',
               resource_deps=['build test image'])
